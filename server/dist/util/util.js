import { encode, decode } from 'html-entities';
export const sanitizeDbValuesForHTML = (results) => {
    const sanitizeObjectValues = (results) => {
        for (let [key, value] of Object.entries(results)) {
            switch (typeof value) {
                case 'string':
                    results[key] = encode(decode(value), { mode: 'nonAscii' });
                    break;
                case 'object':
                    results[key] = sanitizeObjectValues(value);
                    break;
                default:
                    continue;
            }
        }
        return results;
    };
    for (let row of results.rows) {
        sanitizeObjectValues(row);
    }
    return results;
};
export const numericQueryParam = (req, paramName, defaultValue = 1, forceInteger = true) => {
    const castingFunction = forceInteger ? parseInt : parseFloat;
    const queryValue = castingFunction(req.query?.[paramName] ?? defaultValue);
    return isNaN(queryValue) || !isFinite(queryValue) ? defaultValue : queryValue;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0MsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FDckMsT0FBb0MsRUFDUCxFQUFFO0lBQy9CLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxPQUF1QixFQUFrQixFQUFFO1FBQ3ZFLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakQsUUFBUSxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNyQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDM0QsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQyxNQUFNO2dCQUNSO29CQUNFLFNBQVM7WUFDYixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsQ0FBQztJQUVGLEtBQUssSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUMvQixHQUFZLEVBQ1osU0FBaUIsRUFDakIsZUFBdUIsQ0FBQyxFQUN4QixlQUF3QixJQUFJLEVBQ3BCLEVBQUU7SUFDVixNQUFNLGVBQWUsR0FBYSxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3ZFLE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FDL0IsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBWSxJQUFJLFlBQVksQ0FDbkQsQ0FBQztJQUNGLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNoRixDQUFDLENBQUMifQ==