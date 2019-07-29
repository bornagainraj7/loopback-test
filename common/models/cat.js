'use strict';

module.exports = function(Cat) {


    Cat.observe('before save', (context, next) => {
        if(context.instance) {
            context.instance.createdOn = new Date();
            next();
        }
    })


    Cat.afterRemote('findById', (context, cat, next) => {
        cat.description = `${cat.name} is ${cat.age} months old and is a ${cat.breed}`;
        next();
    });


    Cat.adoptable = (id, callback) => {
        Cat.findById(id)
        .then(cat => {
            if(!cat) {
                callback("Cat not found", null);
            }

            let canAdopt = false;

            if(cat.breed != "tiger" && (cat.age < 10)) {
                canAdopt = true;
                callback(null, canAdopt);
            }

            callback(null, canAdopt);
        })
        .catch(err => { 
            console.log(err);
            callback(err, null); 
        })
        
    }


    Cat.remoteMethod('adoptable', {
        accepts: {arg: "id", type: "any"},
        returns: {arg: "adoptable", type: "boolean"}
    });


    Cat.validatesInclusionOf('gender', {'in': ['male', 'female']});
    Cat.validatesNumericalityOf('age', { int:true });

    Cat.validate('age', function(err) {
        if(this.age <= 0) 
        err();
    }, { message: "Must be a positive number" });
};
