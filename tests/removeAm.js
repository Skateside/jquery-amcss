describe("jQuery#removeAm", function () {

    it("should remove one or more values", function () {

        var prefix = $.AM_PREFIX;
        var attrs = {};
        attrs[prefix + "alpha"] = "one two";
        attrs[prefix + "bravo"] = "one two";
        attrs[prefix + "charlie"] = "one two";
        attrs[prefix + "delta"] = "one two";
        var jQdiv = $("<div/>", attrs);

        jQdiv.removeAm("alpha", "one");
        jQdiv.removeAm("bravo", "two one");
        jQdiv.removeAm("charlie", function (i, value) {
            return "two";
        });
        jQdiv.removeAm("delta", function (i, value) {
            return "two one";
        });

        chai.assert.equal(jQdiv.am("alpha"), "two");
        chai.assert.equal(jQdiv.am("bravo"), "");
        chai.assert.equal(jQdiv.am("charlie"), "one");
        chai.assert.equal(jQdiv.am("delta"), "");

    });

    it("should be able to affect multiple AM attributes at once", function () {

        var prefix = $.AM_PREFIX;
        var attrs = {};
        attrs[prefix + "alpha"] = "one two";
        attrs[prefix + "bravo"] = "one two";
        attrs[prefix + "charlie"] = "one two";
        attrs[prefix + "delta"] = "one two";
        var jQdiv = $("<div/>", attrs);

        jQdiv.removeAm({
            alpha: "one",
            bravo: "two one",
            charlie: function (i, value) {
                return "two";
            },
            delta: undefined
        });

        chai.assert.equal(jQdiv.am("alpha"), "two");
        chai.assert.equal(jQdiv.am("bravo"), "");
        chai.assert.equal(jQdiv.am("charlie"), "one");
        chai.assert.isFalse(jQdiv[0].hasAttribute(prefix + "delta"));

    });

    it("should affect all items in the collection", function () {

        var attr = $.AM_PREFIX + "test";
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var jQdiv = $([div1, div2]);

        div1.setAttribute(attr, "one");
        div2.setAttribute(attr, "one");

        chai.assert.isTrue(div1.hasAttribute(attr));
        chai.assert.isTrue(div2.hasAttribute(attr));

        jQdiv.removeAm("test");
        chai.assert.isFalse(div1.hasAttribute(attr));
        chai.assert.isFalse(div2.hasAttribute(attr));

    });

    it("should not remove the attribute when the value is emptied", function () {

        var jQdiv = $("<div/>");
        var attr = $.AM_PREFIX + "test";

        jQdiv.am("test", "one");
        chai.assert.isTrue(jQdiv[0].hasAttribute(attr));
        chai.assert.equal(jQdiv[0].getAttribute(attr), "one");
        jQdiv.removeAm("test", "one");
        chai.assert.isTrue(jQdiv[0].hasAttribute(attr));
        chai.assert.equal(jQdiv[0].getAttribute(attr), "");

    });

    it("should allow the attribute to be removed", function () {

        var div = document.createElement("div");
        var jQdiv = $(div);
        var attr = $.AM_PREFIX + "test";

        div.setAttribute(attr, "one");
        chai.assert.isTrue(div.hasAttribute(attr));
        jQdiv.removeAm("test");
        chai.assert.isFalse(div.hasAttribute(attr));

    });

    it("should be able to remove all AM attributes", function () {

        var prefix = $.AM_PREFIX;
        var attrs = {};
        attrs[prefix + "alpha"] = "one two";
        attrs[prefix + "bravo"] = "one two";
        var jQdiv = $("<div/>", attrs);

        jQdiv.removeAm();
        chai.assert.isEmpty(jQdiv.am());

    });

    it("should return the jQuery instance", function () {

        chai.assert.instanceOf($("<div/>").removeAm(), $);
        chai.assert.instanceOf($("<div/>").removeAm("a"), $);
        chai.assert.instanceOf($("<div/>").removeAm("a", "b"), $);

    });

});
