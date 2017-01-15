export default class WindowVariables {
    public static RetrieveWindowVariables(variables): any {
        var ret = {};

        var scriptContent = "";
        for (var i = 0; i < variables.length; i++) {
            var currVariable = variables[i];
            scriptContent += "if (typeof " + currVariable + " !== 'undefined') document.getElementsByTagName('body')[0].setAttribute('tmp_" + currVariable + "', JSON.stringify(" + currVariable + "));\n"
        }

        var script = document.createElement('script');
        script.id = 'tmpScript';
        script.appendChild(document.createTextNode(scriptContent));
        (document.body || document.head || document.documentElement).appendChild(script);

        for (var i = 0; i < variables.length; i++) {
            var currVariable = variables[i];
            var jsonValue = $("body").attr("tmp_" + currVariable);
            ret[currVariable] = $.parseJSON(jsonValue);
            $("body").removeAttr("tmp_" + currVariable);
        }

        $("#tmpScript").remove();

        return ret;
    }
}