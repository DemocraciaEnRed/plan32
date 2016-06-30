module.exports = {
  'by-title': {
    name: 'by-title',
    label: 'sorts.by-title',
    sort: function (a, b) {
      // Alphabetically by title
      return a.mediaTitle === b.mediaTitle ? 0 : a.mediaTitle > b.mediaTitle ? 1 : -1
    }
  },
  'closing-soon': {
    name: 'closing-soon',
    label: 'sorts.closing-soon',
    sort: function (a, b) {
      if (!a.closingAt && !b.closingAt) {
        // If closingAt isn't defined in both, they're equal
        return 0
      }
      // undefined closingAt always goes last
      // b goes first in this case
      if (!a.closingAt) {
        return 1
      }
      // undefined closingAt always goes last
      // a goes first in this case
      if (!b.closingAt) {
        return -1
      }

      // Closest date first
      return new Date(a.closingAt) - new Date(b.closingAt)
    }
  },

  'newest-first': {
    name: 'newest-first',
    label: 'sorts.newest-first',
    sort: function (a, b) {
      // Newest dates first
      return new Date(b.publishedAt) - new Date(a.publishedAt)
    }
  },

  'oldest-first': {
    name: 'oldest-first',
    label: 'sorts.oldest-first',
    sort: function (a, b) {
      // Oldest dates first
      return new Date(a.publishedAt) - new Date(b.publishedAt)
    }
  },

  'recently-updated': {
    name: 'recently-updated',
    label: 'sorts.recently-updated',
    sort: function (a, b) {
      // Newest dates first
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    }
  }
}
