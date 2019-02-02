/**
 * @copyright Matthew Bill
 */
class LinkBuilder {
  // Links
  static get SELF_REL() { return 'self'; }

  static get PREVIOUS_REL() { return 'previous'; }

  static get FIRST_REL() { return 'first'; }

  static get NEXT_REL() { return 'next'; }

  static get LAST_REL() { return 'last'; }

  // Query Parameter Names
  static get FROM_DATE_PARAM_NAME() { return 'fromDate'; }

  static get TO_DATE_PARAM_NAME() { return 'toDate'; }

  static get INDEX_PARAM_NAME() { return 'index'; }

  static get PAGE_PARAM_NAME() { return 'page'; }

  static get PAGE_SIZE_PARAM_NAME() { return 'pageSize'; }

  static get SORT_PARAM_NAME() { return 'sort'; }

  static get SORT_DIR_PARAM_NAME() { return 'sortDir'; }

  static get FIELDS_PARAM() { return 'fields'; }

  static get EXPAND_PARAM() { return 'expand'; }

  /**
   * Gets the self link url for a collection resource.
   * @param {*} options
   */
  getCollectionSelfUrl(options) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    let href = `${options.resourceUrl}`;
    let joinSymbol = '?';
    if (options.index) {
      href = `${href}${joinSymbol}${LinkBuilder.INDEX_PARAM_NAME}=${options.index}`;
      joinSymbol = '&';
    }
    if (options.pageSize) {
      href = `${href}${joinSymbol}${LinkBuilder.INDEX_PARAM_NAME}=${options.index}`;
      joinSymbol = '&';
    }
    return { href };
  }

  /**
   * Gets the link url for the first page.
   * @param {*} options
   */
  getFirstLinkUrl(options) {
    const self = this;
    return self.getCollectionSelfUrl(options);
  }

  /**
   * Gets the link url for the previous page.
   * @param {*} options
   */
  getPreviousLinkUrl(options) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return { href: `${options.resourceUrl}?${LinkBuilder.INDEX_PARAM_NAME}=${options.index - options.pageSize}&${LinkBuilder.PAGE_SIZE_PARAM_NAME}=${options.pageSize}` };
  }

  /**
   * Gets the link url for the next page.
   * @param {*} options
   */
  getNextLinkUrl(options) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return { href: `${options.resourceUrl}?${LinkBuilder.INDEX_PARAM_NAME}=${options.index + options.pageSize}&${LinkBuilder.PAGE_SIZE_PARAM_NAME}=${options.pageSize}` };
  }

  /**
   * Gets the link url for the last page.
   * @param {*} options
   */
  getLastLinkUrl(options) {
    const self = this;
    if (options.totalCount !== null && options.pageSize < options.totalCount) {
      return { href: `${options.resourceUrl}?${LinkBuilder.INDEX_PARAM_NAME}=${options.totalCount - options.pageSize}&${LinkBuilder.PAGE_SIZE_PARAM_NAME}=${options.pageSize}` };
    }
    return self.getFirstUrl(options);
  }

  getItemLinks(options) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    const _links = {};
    _links[LinkBuilder.SELF_REL] = options.resourceUrl;
    return _links;
  }

  /**
   * Gets the links for a collection resource.
   * @param {*} options
   */
  getCollectionLinks(options) {
    const self = this;
    const _links = {};
    _links[LinkBuilder.SELF_REL] = self.getCollectionSelfUrl(options);
    _links[LinkBuilder.FIRST_REL] = self.getFirstLinkUrl(options);
    if (options.totalCount && options.pageSize) {
      // Previous Link
      if (options.index >= options.pageSize) {
        _links[LinkBuilder.PREVIOUS_REL] = self.getPreviousLinkUrl(options);
      }
      // Next Link
      if (options.totalCount !== null
        && options.index < options.totalCount - options.pageSize) {
        _links[LinkBuilder.NEXT_REL] = self.getNextLinkUrl(options);
      }
      // Last
      _links[LinkBuilder.LAST_REL] = self.getLastLinkUrl(options);
    }
    return _links;
  }
}

module.exports = LinkBuilder;
