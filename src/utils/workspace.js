import _ from 'lodash';

export function replaceTokens(obj, context) {
  if (typeof obj === 'string') {
    return obj.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_original, key) => {
      const parts = key.split('|');
      const transform =
        TOKEN_TRANSFORMERS[parts[1] ? parts[1].trim() : ''] ||
        TOKEN_TRANSFORMERS[''];
      const ret = transform(_.get(context, parts[0].trim(), '') ?? '');
      return ret;
    });
  }
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map((item) => replaceTokens(item, context));
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = replaceTokens(value, context);
      return acc;
    }, {});
  }
  return obj;
}

export const defaultFunc = () => {};
