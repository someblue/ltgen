var tsTypeMap = {
    "uint64": {
        "type": "number",
        "zero": 0,
    },
    "int64": {
        "type": "number",
        "zero": 0,
    },
    "int": {
        "type": "number",
        "zero": 0,
    },
    "uint": {
        "type": "number",
        "zero": 0,
    },
    "string": {
        "type": "string",
        "zero": "''",
    },
    "bool": {
        "type": "boolean",
        "zero": false,
    },
};

var tsPipes = [
    {
        name: 'tsEntityProp',
        func: function (p) {
            if (p.d) {
                if (p.d.type == 'id') {
                    return 'string';
                }
            } else {
                return tsTypeMap[p.t].type;
            }
        }
    },
    {
        name: 'tsPropZero',
        func: function (p) {
            if (p.d) {
                if (p.d.type == 'id') {
                    return 'EntityIdUtil.createEntityId(EntityIdUtil.newCreateEntityIdPart())';
                }
            } else {
                return tsTypeMap[p.t].zero;
            }
        }
    },
    {
        name: 'tsPropFromJson',
        func: function (p) {
            var camelName = _.camelCase(p.n);
            var funcName, args;
            if (p.d) {
                funcName = 'EntityIdPtrValue';
                args = [
                    `src.${name}`,
                ];
            } else {
                funcName = `${_.upperFirst(p.t)}PtrValue`;
                args = [
                    `src.${name}`,
                ];
            }
            return `out.Set${name}(util.${funcName}(${args.join(', ')}))`;
        }
    },
    {
        name: 'goPropToJson',
        func: function (p) {
            var name = _.upperFirst(_.camelCase(p.n));
            var funcName, args;
            if (p.d) {
                funcName = 'EntityIdPtr';
                args = [
                    `src.${name}()`,
                ];
            } else {
                funcName = `${_.upperFirst(p.t)}Ptr`;
                args = [
                    `src.${name}()`,
                ];
            }
            return `out.${name} = util.${funcName}(${args.join(',')})`;
        }
    },
];