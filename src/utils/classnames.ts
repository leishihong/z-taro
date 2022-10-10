import { CSSProperties } from 'react';
import _classnames from 'classnames';
import { map } from 'lodash';

/**
 * 防污染命名
 * @param {String} prefix  - Unique Key
 * @param {styles} styles  - sass style
 */
export const classnames = (prefix: string, styles?: CSSProperties) => {
  const cx = _classnames.bind(styles);
  return (...names: any[]) =>
    cx(
      map(names, (name: Record<string, object>) => {
        if (typeof name === 'string') {
          return `${prefix}-${name}`;
        } else if (typeof name === 'object') {
          const returnObj: { [key: string]: object } = {};
          for (const key in name) {
            if (Object.prototype.hasOwnProperty.call(name, key)) {
              const element = name[key];
              returnObj[`${prefix}-${key}`] = element;
            }
          }
          return returnObj;
        }
        return '';
      }),
    );
};
