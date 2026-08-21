// A zero-dependency, in-memory stand-in for the Mongoose User model.
// Used only when no usable MONGODB_URI is configured, so the auth flow
// (register / login / me) works locally with zero setup.
//
// It implements the small slice of the Mongoose API the routes rely on:
//   - await User.findOne({ email })
//   - const user = new User({ email, password }); await user.save();
//   - await User.findById(id).select('-password')
//
// NOTE: data lives in process memory and is lost on restart.

const crypto = require('crypto');

function createMemoryUserStore() {
  const byEmail = new Map();
  const byId = new Map();

  function UserDoc(data) {
    this._id = data._id || crypto.randomUUID();
    this.email = String(data.email || '').trim().toLowerCase();
    this.password = data.password;
    this.createdAt = new Date();
  }

  UserDoc.prototype.save = async function save() {
    if (byEmail.has(this.email)) {
      const err = new Error(`E11000 duplicate key error: email "${this.email}" already exists`);
      err.code = 11000;
      throw err;
    }
    byEmail.set(this.email, this);
    byId.set(String(this._id), this);
    return this;
  };

  UserDoc.findOne = async (query = {}) => {
    if (query.email) {
      return byEmail.get(String(query.email).trim().toLowerCase()) || null;
    }
    const first = byEmail.values().next();
    return first.done ? null : first.value;
  };

  UserDoc.findById = (id) => {
    const doc = byId.get(String(id)) || null;
    // Minimal Query-like object: await-able and chainable with .select()
    const query = {
      select: () => query,
      exec: async () => doc,
      then: (resolve, reject) => Promise.resolve(doc).then(resolve, reject),
    };
    return query;
  };

  UserDoc.__memory = true;

  return UserDoc;
}

module.exports = { createMemoryUserStore };
