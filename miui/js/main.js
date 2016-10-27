require.config({
    baseUrl:"js/",
    paths:{
        sp:"sport",
        aj:"ajax",
        in:"index"
    },
    shim:{
        "sp":{
            exports:"sp"
        },
        "aj":{
            exports:"aj"
        },
        "in":{
            deps:["sp","aj"],
            exports:"in"
        }
    }
});
require(["sp","aj","in"],function (s,a,i) {
    console.log("The " +
        "require is ok");
})