describe("jQuery#am", function () {

    it("should allow an AM attribute to be set", function () {

        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var jQdivs = $([div1, div2]);
        var prefix = $.AM_PREFIX;

        jQdivs.am("one", 1);
        jQdivs.am({
            two: 2,
            three: 3
        });
        jQdivs.am("four", function (i, value) {
            return value + "_" + i;
        });
        jQdivs.am("five", 5);
        jQdivs.am("five", function (i, value) {
            return value + "_" + i;
        });

        // Can I set using key and value arguments?
        chai.assert.isTrue(div1.hasAttribute(prefix + "one"));
        chai.assert.equal(div1.getAttribute(prefix + "one"), "1");
        chai.assert.isTrue(div2.hasAttribute(prefix + "one"));
        chai.assert.equal(div2.getAttribute(prefix + "one"), "1");

        // Can I set using an object with key/value pairs?
        chai.assert.isTrue(div1.hasAttribute(prefix + "two"));
        chai.assert.equal(div1.getAttribute(prefix + "two"), "2");
        chai.assert.isTrue(div2.hasAttribute(prefix + "two"));
        chai.assert.equal(div2.getAttribute(prefix + "two"), "2");

        chai.assert.isTrue(div1.hasAttribute(prefix + "three"));
        chai.assert.equal(div1.getAttribute(prefix + "three"), "3");
        chai.assert.isTrue(div2.hasAttribute(prefix + "three"));
        chai.assert.equal(div2.getAttribute(prefix + "three"), "3");

        // Can I derive the value with a function?
        chai.assert.isTrue(div1.hasAttribute(prefix + "four"));
        chai.assert.equal(div1.getAttribute(prefix + "four"), "undefined_0");
        chai.assert.isTrue(div2.hasAttribute(prefix + "four"));
        chai.assert.equal(div2.getAttribute(prefix + "four"), "undefined_1");

        chai.assert.isTrue(div1.hasAttribute(prefix + "five"));
        chai.assert.equal(div1.getAttribute(prefix + "five"), "5_0");
        chai.assert.isTrue(div2.hasAttribute(prefix + "five"));
        chai.assert.equal(div2.getAttribute(prefix + "five"), "5_1");

    });

    it("should replace the existing value", function () {

        var div = document.createElement("div");
        var jQdiv = $(div);
        var prefix = $.AM_PREFIX;

        jQdiv.am("one", "a");

        chai.assert.isTrue(div.hasAttribute(prefix + "one"));
        chai.assert.equal(div.getAttribute(prefix + "one"), "a");

        jQdiv.am("one", "b");

        chai.assert.equal(div.getAttribute(prefix + "one"), "b");

    });

    it("should return the AM value of the first element", function () {

        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var jQdivs = $([div1, div2]);
        var prefix = $.AM_PREFIX;

        jQdivs.am("one", "a");
        jQdivs.eq(1).am("one", "b");

        chai.assert.equal(jQdivs.am("one"), div1.getAttribute(prefix + "one"));
        chai.assert.notEqual(jQdivs.am("one"), div2.getAttribute(prefix + "one"));

    });

    it("should return an empty string for an empty attribute", function () {

        var jQdiv = $("<div " + $.AM_PREFIX + "test/>");

        chai.assert.equal(jQdiv.am("test"), "");

    });

    it("should return the AMCSS attributes when no arguments are passed", function () {

        var prefix = $.AM_PREFIX;
        var amAttrs = {};
        amAttrs[prefix + "one"] = "bravo";
        amAttrs[prefix + "two"] = "charlie delta";
        var jQdiv = $("<div/>", $.extend({
            "class": "alpha",
            id: "echo"
        }, amAttrs));

        chai.assert.isNotEmpty(jQdiv.am());
        chai.assert.deepEqual(jQdiv.am(), amAttrs);

    });

    it("should return undefined if the attribute doesn't exist", function () {

        var jQdiv = $("<div " + $.AM_PREFIX + "test=\"one\"></div>");

        chai.assert.isDefined(jQdiv.am("test"));
        chai.assert.isUndefined(jQdiv.am("other"));

    });

    it("should allow the process to be changed by $.amHooks", function () {

        $.amHooks.test = {

            set: function (element, value, name) {

                return element.nodeName.toLowerCase() === "div"
                    ? element.setAttribute(name, value)
                    : undefined;

            },

            get: function (element, name) {

                return element.nodeName.toLowerCase() === "div"
                    ? element.getAttribute(name)
                    : undefined;
            }

        };

        var jQelems = $("<div></div><span></span>");
        var prefix = $.AM_PREFIX;

        jQelems.eq(0).am("test", "has");
        jQelems.eq(1).am("test", "not");

        chai.assert.isTrue(jQelems[0].hasAttribute(prefix + "test"));
        chai.assert.isFalse(jQelems[1].hasAttribute(prefix + "test"));

        chai.assert.equal(
            jQelems.eq(0).am("test"),
            jQelems[0].getAttribute(prefix + "test")
        );
        chai.assert.isUndefined(jQelems.eq(1).am("test"));

        delete $.amHooks.test;

    });

    it("should work with jQuery#is, jQuery#find and jQuery#attr", function () {

        var jQdiv = $("<div/>");
        var prefix = $.AM_PREFIX;

        jQdiv.am("test", 1).wrap("<div/>");

        chai.assert.isTrue(jQdiv.is("[" + prefix + "test]"));
        chai.assert.equal(
            jQdiv.parent().find("[" + prefix + "test]")[0],
            jQdiv[0]
        );
        chai.assert.equal(jQdiv.attr(prefix + "test"), jQdiv.am("test"));

    });

    it("should return a jQuery instance after setting", function () {
        chai.assert.instanceOf($("<div/>").am("test", "one"), $);
    });

});
