import { buildSystem } from './systemBuilder';
import { solve } from './systemSolver';
import { getExpression } from './helpers';

const createModel = () => {
  let params = {};

  const fit = (data, degrees) => {
    // Transforma datele din { x, y } în [x, y]
    const transformedData = data.map(point => [point.x, point.y]);

    degrees.forEach(degree => {
      const system = buildSystem(transformedData, degree); // Transmite datele transformate
      const coefficients = solve(...system);
      params[degree] = coefficients;
    });
  };

  const estimate = (degree, x) => 
    params[degree] && params[degree].reduce((acc, c, i) => acc + c * x ** i, 0);

  const loadParams = (loadedData) => {
    params = { ...params, ...loadedData };
  };

  const saveParams = () => params;

  const saveExpressions = () => {
    return Object.entries(params).reduce((acc, [degree, coefficients]) => {
      acc[degree] = getExpression(coefficients);
      return acc;
    }, {});
  };

  const expressions = () => {
    return Object.entries(params).reduce((acc, [degree, coefficients]) => {
      acc[degree] = getExpression(coefficients);
      return acc;
    }, {});
  };

  return { fit, estimate, loadParams, saveParams, saveExpressions, expressions };
};

export default createModel;
