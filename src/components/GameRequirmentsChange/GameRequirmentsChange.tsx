import { useEffect } from 'react';
import { IGameRequirements, MinimumRequirements } from './GameRequirementsTypes';

import style from './GameRequirmentsChange.module.scss';

export const GameRequirements = ({
  pcRequirements,
  minimumRequirements,
  setMinimumRequirements,
}: IGameRequirements) => {
  useEffect(() => {
    const parseHTML = (htmlString: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const minimumRequirementsNode = doc.body.lastChild;

      if (minimumRequirementsNode instanceof Element) {
        const requirementsArray = Array.from(minimumRequirementsNode.childNodes)
          .map((node) => node.textContent?.trim())
          .filter((text) => text !== null && text !== undefined);

        const requirementsObject = requirementsArray.reduce<MinimumRequirements>(
          (acc, requirement) => {
            const [key, value] = requirement?.split(':').map((item) => item.trim()) || [];
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          },
          {},
        );

        setMinimumRequirements(requirementsObject);
      }
    };

    parseHTML(pcRequirements);
  }, [pcRequirements]);

  const handleInputChange = (key: string, value: string) => {
    setMinimumRequirements({
      ...minimumRequirements,
      [key]: value,
    });
  };
  return (
    <div className={style.requirements}>
      <h3 className={style.requirements__header}>Минимальные системные требования</h3>
      <ul className={style.requirements__containter}>
        {Object.entries(minimumRequirements)
          .slice(1)
          .map(([key, value]) => (
            <li className={style.requirements__item} key={key}>
              <label >{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
