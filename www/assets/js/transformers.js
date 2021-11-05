
    editor.transformers = {
        "round" : {
            "render" : function(data) {
                return Math.round(100 * (1-data),2) + "%";
            }
        },
        "opendatalink" : {
            "render" : function(data) {
                this._data = data;
                data = "https://opendata.slo.nl/curriculum/api-acpt/v1/uuid/"+data;
                return data;
            },
            "extract": function() {
                return this._data;
            }
        },
        "editlink" : {
            "render" : function(data) {
            	this._data = data;
                return {
                    innerHTML : data,
                    href : 'https://opendata.slo.nl/curriculum/beheer/entiteiten-editor/#edit/' + data
                };
            },
            "extract" : function(el) {
                return this._data;
            }
        },
        "uuid": {
            "render": function(data) {
                this.id = data;
                return data;
            }
        },
        "idToTitle": {
            "render" : function(data) {
                this.sloId = data;
                var entity = clone(curriculum.index.id[data]);
                if (curriculum.index.type[data] == "doelniveau") {
                    if (entity.doel_id && entity.doel_id[0]) {
                        var doel = clone(curriculum.index.id[entity.doel_id[0]]);
                    } else if (entity.kerndoel_id && entity.kerndoel_id[0]) {
                        var doel = clone(curriculum.index.id[entity.kerndoel_id[0]]);
                    }
                    if (entity.niveau_id && entity.niveau_id[0]) {
                        var niveau = clone(curriculum.index.id[entity.niveau_id[0]]);
                    }
                    var result = '';
                    if (niveau && niveau.title ) {
                        result += '['+niveau.title+'] ';
                    } else {
                        result += '[geen niveau]';
                    }
                    if (doel && doel.title) {
                        result += doel.title;
                    } else {
                        result += 'geen doel';
                    }
                    return result;
                } else {
                    if (typeof curriculum.index.id[data] == 'undefined') {
                        return 'missing';
                    }
                    return curriculum.index.id[data].title ? clone(curriculum.index.id[data].title) : "";
                }
            },
            "extract" : function(el) {
                return this.sloId;
            }
        },
        "hasDescription" : {
            render : function(data) {
                return (typeof data.description !== "undefined");
            }
        },
        "hasTitle" : {
            render : function(data) {
                return (typeof data.title !== "undefined");
            }
        },
        "isarray" : {
            render : function(data) {
                this.data = data;
                return Array.isArray(data);
            },
            extract : function(el) {
                return this.data;
            }
        },
        "searchoption" : {
            render : function(entity) {
                entity = clone(entity);
                this.data = entity;
                var option = entity.title + " " + entity.id;

                if (curriculum.index.type[entity.id]=="doelniveau") {
                    var doel = clone(curriculum.index.id[entity.doel_id[0]]);
                    var niveau = clone(curriculum.index.id[entity.niveau_id[0]]);
                    option = "[" + niveau.title + "] " + doel.title + " " + entity.id;
                }

                return {
                    innerHTML : option,
                    value : entity.id
                };
            },
            extract : function(el) {
                return this.data;
            }
        }
    };
