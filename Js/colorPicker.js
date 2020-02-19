/*!
 * iro.js v4.5.3
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.iro = e());
})(this, function() {
  "use strict";
  var c = function() {},
    i = {},
    h = [],
    u = [];
  function p(t, e) {
    var o,
      n,
      r,
      i,
      s = arguments,
      a = u;
    for (i = arguments.length; 2 < i--; ) h.push(s[i]);
    for (
      e &&
      null != e.children &&
      (h.length || h.push(e.children), delete e.children);
      h.length;

    )
      if ((n = h.pop()) && void 0 !== n.pop)
        for (i = n.length; i--; ) h.push(n[i]);
      else
        "boolean" == typeof n && (n = null),
          (r = "function" != typeof t) &&
            (null == n
              ? (n = "")
              : "number" == typeof n
              ? (n = String(n))
              : "string" != typeof n && (r = !1)),
          r && o ? (a[a.length - 1] += n) : a === u ? (a = [n]) : a.push(n),
          (o = r);
    var l = new c();
    return (
      (l.nodeName = t),
      (l.children = a),
      (l.attributes = null == e ? void 0 : e),
      (l.key = null == e ? void 0 : e.key),
      l
    );
  }
  function M(t, e) {
    for (var o in e) t[o] = e[o];
    return t;
  }
  function l(t, e) {
    null != t && ("function" == typeof t ? t(e) : (t.current = e));
  }
  var e =
      "function" == typeof Promise
        ? Promise.resolve().then.bind(Promise.resolve())
        : setTimeout,
    f = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
    o = [];
  function s(t) {
    !t._dirty && (t._dirty = !0) && 1 == o.push(t) && e(n);
  }
  function n() {
    for (var t; (t = o.pop()); ) t._dirty && I(t);
  }
  function S(t, e) {
    return (
      t.normalizedNodeName === e || t.nodeName.toLowerCase() === e.toLowerCase()
    );
  }
  function E(t) {
    var e = M({}, t.attributes);
    e.children = t.children;
    var o = t.nodeName.defaultProps;
    if (void 0 !== o) for (var n in o) void 0 === e[n] && (e[n] = o[n]);
    return e;
  }
  function N(t) {
    var e = t.parentNode;
    e && e.removeChild(t);
  }
  function v(t, e, o, n, r) {
    if (("className" === e && (e = "class"), "key" === e));
    else if ("ref" === e) l(o, null), l(n, t);
    else if ("class" !== e || r)
      if ("style" === e) {
        if (
          ((n && "string" != typeof n && "string" != typeof o) ||
            (t.style.cssText = n || ""),
          n && "object" == typeof n)
        ) {
          if ("string" != typeof o)
            for (var i in o) i in n || (t.style[i] = "");
          for (var i in n)
            t.style[i] =
              "number" == typeof n[i] && !1 === f.test(i) ? n[i] + "px" : n[i];
        }
      } else if ("dangerouslySetInnerHTML" === e)
        n && (t.innerHTML = n.__html || "");
      else if ("o" == e[0] && "n" == e[1]) {
        var s = e !== (e = e.replace(/Capture$/, ""));
        (e = e.toLowerCase().substring(2)),
          n ? o || t.addEventListener(e, d, s) : t.removeEventListener(e, d, s),
          ((t._listeners || (t._listeners = {}))[e] = n);
      } else if ("list" !== e && "type" !== e && !r && e in t) {
        try {
          t[e] = null == n ? "" : n;
        } catch (t) {}
        (null != n && !1 !== n) || "spellcheck" == e || t.removeAttribute(e);
      } else {
        var a = r && e !== (e = e.replace(/^xlink:?/, ""));
        null == n || !1 === n
          ? a
            ? t.removeAttributeNS(
                "http://www.w3.org/1999/xlink",
                e.toLowerCase()
              )
            : t.removeAttribute(e)
          : "function" != typeof n &&
            (a
              ? t.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  e.toLowerCase(),
                  n
                )
              : t.setAttribute(e, n));
      }
    else t.className = n || "";
  }
  function d(t) {
    return this._listeners[t.type](t);
  }
  var T = [],
    H = 0,
    g = !1,
    _ = !1;
  function P() {
    for (var t; (t = T.shift()); ) t.componentDidMount && t.componentDidMount();
  }
  function A(t, e, o, n, r, i) {
    H++ ||
      ((g = null != r && void 0 !== r.ownerSVGElement),
      (_ = null != t && !("__preactattr_" in t)));
    var s = U(t, e, o, n, i);
    return (
      r && s.parentNode !== r && r.appendChild(s),
      --H || ((_ = !1), i || P()),
      s
    );
  }
  function U(t, e, o, n, r) {
    var i = t,
      s = g;
    if (
      ((null != e && "boolean" != typeof e) || (e = ""),
      "string" == typeof e || "number" == typeof e)
    )
      return (
        t && void 0 !== t.splitText && t.parentNode && (!t._component || r)
          ? t.nodeValue != e && (t.nodeValue = e)
          : ((i = document.createTextNode(e)),
            t && (t.parentNode && t.parentNode.replaceChild(i, t), O(t, !0))),
        (i.__preactattr_ = !0),
        i
      );
    var a,
      l,
      c = e.nodeName;
    if ("function" == typeof c)
      return (function(t, e, o, n) {
        var r = t && t._component,
          i = r,
          s = t,
          a = r && t._componentConstructor === e.nodeName,
          l = a,
          c = E(e);
        for (; r && !l && (r = r._parentComponent); )
          l = r.constructor === e.nodeName;
        r && l && (!n || r._component)
          ? (j(r, c, 3, o, n), (t = r.base))
          : (i && !a && (L(i), (t = s = null)),
            (r = R(e.nodeName, c, o)),
            t && !r.nextBase && ((r.nextBase = t), (s = null)),
            j(r, c, 1, o, n),
            (t = r.base),
            s && t !== s && ((s._component = null), O(s, !1)));
        return t;
      })(t, e, o, n);
    if (
      ((g = "svg" === c || ("foreignObject" !== c && g)),
      (c = String(c)),
      (!t || !S(t, c)) &&
        ((a = c),
        ((l = g
          ? document.createElementNS("http://www.w3.org/2000/svg", a)
          : document.createElement(a)).normalizedNodeName = a),
        (i = l),
        t))
    ) {
      for (; t.firstChild; ) i.appendChild(t.firstChild);
      t.parentNode && t.parentNode.replaceChild(i, t), O(t, !0);
    }
    var h = i.firstChild,
      u = i.__preactattr_,
      p = e.children;
    if (null == u) {
      u = i.__preactattr_ = {};
      for (var f = i.attributes, d = f.length; d--; ) u[f[d].name] = f[d].value;
    }
    return (
      !_ &&
      p &&
      1 === p.length &&
      "string" == typeof p[0] &&
      null != h &&
      void 0 !== h.splitText &&
      null == h.nextSibling
        ? h.nodeValue != p[0] && (h.nodeValue = p[0])
        : ((p && p.length) || null != h) &&
          (function(t, e, o, n, r) {
            var i,
              s,
              a,
              l,
              c,
              h = t.childNodes,
              u = [],
              p = {},
              f = 0,
              d = 0,
              v = h.length,
              g = 0,
              _ = e ? e.length : 0;
            if (0 !== v)
              for (var m = 0; m < v; m++) {
                var y = h[m],
                  b = y.__preactattr_,
                  w =
                    _ && b ? (y._component ? y._component.__key : b.key) : null;
                null != w
                  ? (f++, (p[w] = y))
                  : (b ||
                      (void 0 !== y.splitText
                        ? !r || y.nodeValue.trim()
                        : r)) &&
                    (u[g++] = y);
              }
            if (0 !== _)
              for (var m = 0; m < _; m++) {
                (l = e[m]), (c = null);
                var w = l.key;
                if (null != w)
                  f && void 0 !== p[w] && ((c = p[w]), (p[w] = void 0), f--);
                else if (d < g)
                  for (i = d; i < g; i++)
                    if (
                      void 0 !== u[i] &&
                      ((x = s = u[i]),
                      (C = r),
                      "string" == typeof (k = l) || "number" == typeof k
                        ? void 0 !== x.splitText
                        : "string" == typeof k.nodeName
                        ? !x._componentConstructor && S(x, k.nodeName)
                        : C || x._componentConstructor === k.nodeName)
                    ) {
                      (c = s),
                        (u[i] = void 0),
                        i === g - 1 && g--,
                        i === d && d++;
                      break;
                    }
                (c = U(c, l, o, n)),
                  (a = h[m]),
                  c &&
                    c !== t &&
                    c !== a &&
                    (null == a
                      ? t.appendChild(c)
                      : c === a.nextSibling
                      ? N(a)
                      : t.insertBefore(c, a));
              }
            var x, k, C;
            if (f) for (var m in p) void 0 !== p[m] && O(p[m], !1);
            for (; d <= g; ) void 0 !== (c = u[g--]) && O(c, !1);
          })(i, p, o, n, _ || null != u.dangerouslySetInnerHTML),
      (function(t, e, o) {
        var n;
        for (n in o)
          (e && null != e[n]) ||
            null == o[n] ||
            v(t, n, o[n], (o[n] = void 0), g);
        for (n in e)
          "children" === n ||
            "innerHTML" === n ||
            (n in o &&
              e[n] === ("value" === n || "checked" === n ? t[n] : o[n])) ||
            v(t, n, o[n], (o[n] = e[n]), g);
      })(i, e.attributes, u),
      (g = s),
      i
    );
  }
  function O(t, e) {
    var o = t._component;
    o
      ? L(o)
      : (null != t.__preactattr_ && l(t.__preactattr_.ref, null),
        (!1 !== e && null != t.__preactattr_) || N(t),
        r(t));
  }
  function r(t) {
    for (t = t.lastChild; t; ) {
      var e = t.previousSibling;
      O(t, !0), (t = e);
    }
  }
  var a = [];
  function R(t, e, o) {
    var n,
      r = a.length;
    for (
      t.prototype && t.prototype.render
        ? ((n = new t(e, o)), y.call(n, e, o))
        : (((n = new y(e, o)).constructor = t), (n.render = m));
      r--;

    )
      if (a[r].constructor === t)
        return (n.nextBase = a[r].nextBase), a.splice(r, 1), n;
    return n;
  }
  function m(t, e, o) {
    return this.constructor(t, o);
  }
  function j(t, e, o, n, r) {
    t._disable ||
      ((t._disable = !0),
      (t.__ref = e.ref),
      (t.__key = e.key),
      delete e.ref,
      delete e.key,
      void 0 === t.constructor.getDerivedStateFromProps &&
        (!t.base || r
          ? t.componentWillMount && t.componentWillMount()
          : t.componentWillReceiveProps && t.componentWillReceiveProps(e, n)),
      n &&
        n !== t.context &&
        (t.prevContext || (t.prevContext = t.context), (t.context = n)),
      t.prevProps || (t.prevProps = t.props),
      (t.props = e),
      (t._disable = !1),
      0 !== o &&
        (1 !== o && !1 === i.syncComponentUpdates && t.base
          ? s(t)
          : I(t, 1, r)),
      l(t.__ref, t));
  }
  function I(t, e, o, n) {
    if (!t._disable) {
      var r,
        i,
        s,
        a = t.props,
        l = t.state,
        c = t.context,
        h = t.prevProps || a,
        u = t.prevState || l,
        p = t.prevContext || c,
        f = t.base,
        d = t.nextBase,
        v = f || d,
        g = t._component,
        _ = !1,
        m = p;
      if (
        (t.constructor.getDerivedStateFromProps &&
          ((l = M(M({}, l), t.constructor.getDerivedStateFromProps(a, l))),
          (t.state = l)),
        f &&
          ((t.props = h),
          (t.state = u),
          (t.context = p),
          2 !== e &&
          t.shouldComponentUpdate &&
          !1 === t.shouldComponentUpdate(a, l, c)
            ? (_ = !0)
            : t.componentWillUpdate && t.componentWillUpdate(a, l, c),
          (t.props = a),
          (t.state = l),
          (t.context = c)),
        (t.prevProps = t.prevState = t.prevContext = t.nextBase = null),
        (t._dirty = !1),
        !_)
      ) {
        (r = t.render(a, l, c)),
          t.getChildContext && (c = M(M({}, c), t.getChildContext())),
          f &&
            t.getSnapshotBeforeUpdate &&
            (m = t.getSnapshotBeforeUpdate(h, u));
        var y,
          b,
          w = r && r.nodeName;
        if ("function" == typeof w) {
          var x = E(r);
          (i = g) && i.constructor === w && x.key == i.__key
            ? j(i, x, 1, c, !1)
            : ((y = i),
              (t._component = i = R(w, x, c)),
              (i.nextBase = i.nextBase || d),
              (i._parentComponent = t),
              j(i, x, 0, c, !1),
              I(i, 1, o, !0)),
            (b = i.base);
        } else
          (s = v),
            (y = g) && (s = t._component = null),
            (v || 1 === e) &&
              (s && (s._component = null),
              (b = A(s, r, c, o || !f, v && v.parentNode, !0)));
        if (v && b !== v && i !== g) {
          var k = v.parentNode;
          k &&
            b !== k &&
            (k.replaceChild(b, v), y || ((v._component = null), O(v, !1)));
        }
        if ((y && L(y), (t.base = b) && !n)) {
          for (var C = t, S = t; (S = S._parentComponent); ) (C = S).base = b;
          (b._component = C), (b._componentConstructor = C.constructor);
        }
      }
      for (
        !f || o
          ? T.push(t)
          : _ || (t.componentDidUpdate && t.componentDidUpdate(h, u, m));
        t._renderCallbacks.length;

      )
        t._renderCallbacks.pop().call(t);
      H || n || P();
    }
  }
  function L(t) {
    var e = t.base;
    (t._disable = !0),
      t.componentWillUnmount && t.componentWillUnmount(),
      (t.base = null);
    var o = t._component;
    o
      ? L(o)
      : e &&
        (null != e.__preactattr_ && l(e.__preactattr_.ref, null),
        N((t.nextBase = e)),
        a.push(t),
        r(e)),
      l(t.__ref, null);
  }
  function y(t, e) {
    (this._dirty = !0),
      (this.context = e),
      (this.props = t),
      (this.state = this.state || {}),
      (this._renderCallbacks = []);
  }
  function b(t, e, o, n) {
    void 0 === n && (n = {});
    for (var r = 0; r < e.length; r++) t.addEventListener(e[r], o, n);
  }
  function w(t, e, o, n) {
    void 0 === n && (n = {});
    for (var r = 0; r < e.length; r++) t.removeEventListener(e[r], o, n);
  }
  M(y.prototype, {
    setState: function(t, e) {
      this.prevState || (this.prevState = this.state),
        (this.state = M(
          M({}, this.state),
          "function" == typeof t ? t(this.state, this.props) : t
        )),
        e && this._renderCallbacks.push(e),
        s(this);
    },
    forceUpdate: function(t) {
      t && this._renderCallbacks.push(t), I(this, 2);
    },
    render: function() {}
  });
  var x = "mousedown",
    k = "mousemove",
    C = "mouseup",
    B = "touchstart",
    D = "touchmove",
    W = "touchend",
    t = (function(e) {
      function t(t) {
        e.call(this, t),
          (this.uid = (Math.random() + 1).toString(36).substring(5));
      }
      return (
        e && (t.__proto__ = e),
        (((t.prototype = Object.create(
          e && e.prototype
        )).constructor = t).prototype.componentDidMount = function() {
          b(this.base, [x, B], this, { passive: !1 });
        }),
        (t.prototype.componentWillUnmount = function() {
          w(this.base, [x, B], this);
        }),
        (t.prototype.handleEvent = function(t) {
          t.preventDefault();
          var e = t.touches ? t.changedTouches[0] : t,
            o = e.clientX,
            n = e.clientY,
            r = this.base.getBoundingClientRect();
          switch (t.type) {
            case x:
            case B:
              b(document, [k, D, C, W], this, { passive: !1 }),
                this.handleInput(o, n, r, "START");
              break;
            case k:
            case D:
              this.handleInput(o, n, r, "MOVE");
              break;
            case C:
            case W:
              this.handleInput(o, n, r, "END"),
                w(document, [k, D, C, W], this, { passive: !1 });
          }
        }),
        t
      );
    })(y),
    V = document.getElementsByTagName("base");
  function F(t) {
    var e = window.location,
      o = window.navigator.userAgent,
      n = /^((?!chrome|android).)*safari/i.test(o),
      r = /iPhone|iPod|iPad/i.test(o);
    return (n || r) && 0 < V.length
      ? e.protocol + "//" + e.host + e.pathname + e.search + t
      : t;
  }
  function $(t, e, o, n, r) {
    var i = r - n <= 180 ? 0 : 1;
    return (
      (n *= Math.PI / 180),
      (r *= Math.PI / 180),
      "M " +
        (t + o * Math.cos(r)) +
        " " +
        (e + o * Math.sin(r)) +
        " A " +
        o +
        " " +
        o +
        " 0 " +
        i +
        " 0 " +
        (t + o * Math.cos(n)) +
        " " +
        (e + o * Math.sin(n))
    );
  }
  function G(t) {
    var e = t.r,
      o = t.url;
    return p(
      "svg",
      { class: "iro__handle", x: t.x, y: t.y, style: { overflow: "visible" } },
      o && p("use", Object.assign({}, { xlinkHref: F(o) }, t.origin)),
      !o &&
        p("circle", {
          class: "iro__handle__inner",
          r: e,
          fill: "none",
          "stroke-width": 2,
          stroke: "#000"
        }),
      !o &&
        p("circle", {
          class: "iro__handle__outer",
          r: e - 2,
          fill: "none",
          "stroke-width": 2,
          stroke: "#fff"
        })
    );
  }
  G.defaultProps = { x: 0, y: 0, r: 8, url: null, origin: { x: 0, y: 0 } };
  var z = Array.apply(null, { length: 360 }).map(function(t, e) {
      return e;
    }),
    q = (function(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        t && (e.__proto__ = t),
        (((e.prototype = Object.create(
          t && t.prototype
        )).constructor = e).prototype._transformAngle = function(t, e) {
          var o = this.props.wheelAngle;
          return (
            (((t =
              "clockwise" === this.props.wheelDirection
                ? -360 + t - (e ? -o : o)
                : o - t) %
              360) +
              360) %
            360
          );
        }),
        (e.prototype.render = function(t) {
          var e = this,
            o = t.width,
            n = t.borderWidth,
            r = t.handleRadius,
            i = t.color.hsv,
            s = o / 2 - n,
            a = this._transformAngle(i.h, !0) * (Math.PI / 180),
            l = (i.s / 100) * (s - t.padding - r - n),
            c = s + n,
            h = s + n;
          return p(
            "svg",
            {
              class: "iro__wheel",
              width: o,
              height: o,
              style: { overflow: "visible", display: "block" }
            },
            p(
              "defs",
              null,
              p(
                "radialGradient",
                { id: this.uid },
                p("stop", { offset: "0%", "stop-color": "#fff" }),
                p("stop", {
                  offset: "100%",
                  "stop-color": "#fff",
                  "stop-opacity": "0"
                })
              )
            ),
            p(
              "g",
              { class: "iro__wheel__hue", "stroke-width": s, fill: "none" },
              z.map(function(t) {
                return p("path", {
                  key: t,
                  d: $(c, h, s / 2, t, t + 1.5),
                  stroke: "hsl(" + e._transformAngle(t) + ", 100%, 50%)"
                });
              })
            ),
            p("circle", {
              class: "iro__wheel__saturation",
              cx: c,
              cy: h,
              r: s,
              fill: "url(" + F("#" + this.uid) + ")"
            }),
            t.wheelLightness &&
              p("circle", {
                class: "iro__wheel__lightness",
                cx: c,
                cy: h,
                r: s,
                fill: "#000",
                opacity: 1 - i.v / 100
              }),
            p("circle", {
              class: "iro__wheel__border",
              cx: c,
              cy: h,
              r: s,
              fill: "none",
              stroke: t.borderColor,
              "stroke-width": n
            }),
            p(G, {
              r: r,
              url: t.handleSvg,
              origin: t.handleOrigin,
              x: c + l * Math.cos(a),
              y: h + l * Math.sin(a)
            })
          );
        }),
        (e.prototype.handleInput = function(t, e, o, n) {
          var r = o.left,
            i = o.top,
            s = this.props,
            a = s.width / 2,
            l = a - s.padding - s.handleRadius - s.borderWidth;
          (t = a - (t - r)), (e = a - (e - i));
          var c = Math.atan2(e, t),
            h = this._transformAngle(Math.round(c * (180 / Math.PI)) + 180),
            u = Math.min(Math.sqrt(t * t + e * e), l);
          s.onInput(n, { h: h, s: Math.round((100 / l) * u) });
        }),
        e
      );
    })(t);
  function X(t, e) {
    var o = -1 < t.indexOf("%"),
      n = parseFloat(t);
    return o ? (e / 100) * n : n;
  }
  function Y(t) {
    return parseInt(t, 16);
  }
  function J(t) {
    return t.toString(16).padStart(2, "0");
  }
  var K = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",
    Q = "[\\s|\\(]+(" + K + ")[,|\\s]+(" + K + ")[,|\\s]+(" + K + ")\\s*\\)?",
    Z =
      "[\\s|\\(]+(" +
      K +
      ")[,|\\s]+(" +
      K +
      ")[,|\\s]+(" +
      K +
      ")[,|\\s]+(" +
      K +
      ")\\s*\\)?",
    tt = new RegExp("rgb" + Q),
    et = new RegExp("rgba" + Z),
    ot = new RegExp("hsl" + Q),
    nt = new RegExp("hsla" + Z),
    rt = "^(?:#?|0x?)",
    it = "([0-9a-fA-F]{1})",
    st = "([0-9a-fA-F]{2})",
    at = new RegExp("" + rt + it + it + it + "$"),
    lt = new RegExp("" + rt + it + it + it + it + "$"),
    ct = new RegExp("" + rt + st + st + st + "$"),
    ht = new RegExp("" + rt + st + st + st + st + "$"),
    ut = function(t) {
      (this._onChange = !1),
        (this._value = { h: 0, s: 0, v: 0, a: 1 }),
        t && this.set(t);
    },
    pt = {
      hsv: { configurable: !0 },
      rgb: { configurable: !0 },
      hsl: { configurable: !0 },
      rgbString: { configurable: !0 },
      hexString: { configurable: !0 },
      hslString: { configurable: !0 }
    };
  (ut.prototype.set = function(t) {
    var e = "string" == typeof t,
      o = "object" == typeof t;
    if (e && /^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t)) this.hexString = t;
    else if (e && /^rgba?/.test(t)) this.rgbString = t;
    else if (e && /^hsla?/.test(t)) this.hslString = t;
    else if (o && t instanceof ut) this.hsv = t.hsv;
    else if (o && "r" in t && "g" in t && "b" in t) this.rgb = t;
    else if (o && "h" in t && "s" in t && "v" in t) this.hsv = t;
    else {
      if (!(o && "h" in t && "s" in t && "l" in t))
        throw new Error("invalid color value");
      this.hsl = t;
    }
  }),
    (ut.prototype.setChannel = function(t, e, o) {
      var n;
      this[t] = Object.assign({}, this[t], (((n = {})[e] = o), n));
    }),
    (ut.prototype.clone = function() {
      return new ut(this);
    }),
    (ut.hsvToRgb = function(t) {
      var e = t.h / 60,
        o = t.s / 100,
        n = t.v / 100,
        r = Math.floor(e),
        i = e - r,
        s = n * (1 - o),
        a = n * (1 - i * o),
        l = n * (1 - (1 - i) * o),
        c = r % 6;
      return {
        r: 255 * [n, a, s, s, l, n][c],
        g: 255 * [l, n, n, a, s, s][c],
        b: 255 * [s, s, l, n, n, a][c]
      };
    }),
    (ut.rgbToHsv = function(t) {
      var e,
        o = t.r / 255,
        n = t.g / 255,
        r = t.b / 255,
        i = Math.max(o, n, r),
        s = Math.min(o, n, r),
        a = i - s,
        l = i,
        c = 0 === i ? 0 : a / i;
      switch (i) {
        case s:
          e = 0;
          break;
        case o:
          e = (n - r) / a + (n < r ? 6 : 0);
          break;
        case n:
          e = (r - o) / a + 2;
          break;
        case r:
          e = (o - n) / a + 4;
      }
      return { h: 60 * e, s: 100 * c, v: 100 * l };
    }),
    (ut.hsvToHsl = function(t) {
      var e = t.s / 100,
        o = t.v / 100,
        n = (2 - e) * o,
        r = n <= 1 ? n : 2 - n,
        i = r < 1e-9 ? 0 : (e * o) / r;
      return { h: t.h, s: 100 * i, l: 50 * n };
    }),
    (ut.hslToHsv = function(t) {
      var e = 2 * t.l,
        o = (t.s * (e <= 100 ? e : 200 - e)) / 100,
        n = e + o < 1e-9 ? 0 : (2 * o) / (e + o);
      return { h: t.h, s: 100 * n, v: (e + o) / 2 };
    }),
    (pt.hsv.get = function() {
      var t = this._value;
      return { h: t.h, s: t.s, v: t.v };
    }),
    (pt.hsv.set = function(t) {
      var e = this._value;
      if (((t = Object.assign({}, e, t)), this._onChange)) {
        var o = {};
        for (var n in e) o[n] = t[n] != e[n];
        (this._value = t),
          (o.h || o.s || o.v || o.a) && this._onChange(this, o);
      } else this._value = t;
    }),
    (pt.rgb.get = function() {
      var t = ut.hsvToRgb(this._value),
        e = t.r,
        o = t.g,
        n = t.b;
      return { r: Math.round(e), g: Math.round(o), b: Math.round(n) };
    }),
    (pt.rgb.set = function(t) {
      this.hsv = Object.assign({}, ut.rgbToHsv(t), {
        a: void 0 === t.a ? 1 : t.a
      });
    }),
    (pt.hsl.get = function() {
      var t = ut.hsvToHsl(this._value),
        e = t.h,
        o = t.s,
        n = t.l;
      return { h: Math.round(e), s: Math.round(o), l: Math.round(n) };
    }),
    (pt.hsl.set = function(t) {
      this.hsv = Object.assign({}, ut.hslToHsv(t), {
        a: void 0 === t.a ? 1 : t.a
      });
    }),
    (pt.rgbString.get = function() {
      var t = this.rgb;
      return "rgb(" + t.r + ", " + t.g + ", " + t.b + ")";
    }),
    (pt.rgbString.set = function(t) {
      var e,
        o,
        n,
        r,
        i = 1;
      if (
        ((e = tt.exec(t))
          ? ((o = X(e[1], 255)), (n = X(e[2], 255)), (r = X(e[3], 255)))
          : (e = et.exec(t)) &&
            ((o = X(e[1], 255)),
            (n = X(e[2], 255)),
            (r = X(e[3], 255)),
            (i = X(e[4], 1))),
        !e)
      )
        throw new Error("invalid rgb string");
      this.rgb = { r: o, g: n, b: r, a: i };
    }),
    (pt.hexString.get = function() {
      var t = this.rgb;
      return "#" + J(t.r) + J(t.g) + J(t.b);
    }),
    (pt.hexString.set = function(t) {
      var e,
        o,
        n,
        r,
        i = 255;
      if (
        ((e = at.exec(t))
          ? ((o = 17 * Y(e[1])), (n = 17 * Y(e[2])), (r = 17 * Y(e[3])))
          : (e = lt.exec(t))
          ? ((o = 17 * Y(e[1])),
            (n = 17 * Y(e[2])),
            (r = 17 * Y(e[3])),
            (i = 17 * Y(e[4])))
          : (e = ct.exec(t))
          ? ((o = Y(e[1])), (n = Y(e[2])), (r = Y(e[3])))
          : (e = ht.exec(t)) &&
            ((o = Y(e[1])), (n = Y(e[2])), (r = Y(e[3])), (i = Y(e[4]))),
        !e)
      )
        throw new Error("invalid hex string");
      this.rgb = { r: o, g: n, b: r, a: i / 255 };
    }),
    (pt.hslString.get = function() {
      var t = this.hsl;
      return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
    }),
    (pt.hslString.set = function(t) {
      var e,
        o,
        n,
        r,
        i = 1;
      if (
        ((e = ot.exec(t))
          ? ((o = X(e[1], 360)), (n = X(e[2], 100)), (r = X(e[3], 100)))
          : (e = nt.exec(t)) &&
            ((o = X(e[1], 360)),
            (n = X(e[2], 100)),
            (r = X(e[3], 100)),
            (i = X(e[4], 1))),
        !e)
      )
        throw new Error("invalid hsl string");
      this.hsl = { h: o, s: n, l: r, a: i };
    }),
    Object.defineProperties(ut.prototype, pt);
  var ft = (function(t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (((e.prototype = Object.create(
        t && t.prototype
      )).constructor = e).prototype.renderGradient = function(t) {
        var e = t.color.hsv,
          o = [];
        switch (t.sliderType) {
          case "hue":
            o = [
              { offset: "0", color: "#f00" },
              { offset: "16.666", color: "#ff0" },
              { offset: "33.333", color: "#0f0" },
              { offset: "50", color: "#0ff" },
              { offset: "66.666", color: "#00f" },
              { offset: "83.333", color: "#f0f" },
              { offset: "100", color: "#f00" }
            ];
            break;
          case "saturation":
            var n = ut.hsvToHsl({ h: e.h, s: 0, v: e.v }),
              r = ut.hsvToHsl({ h: e.h, s: 100, v: e.v });
            o = [
              {
                offset: "0",
                color: "hsl(" + n.h + ", " + n.s + "%, " + n.l + "%)"
              },
              {
                offset: "100",
                color: "hsl(" + r.h + ", " + r.s + "%, " + r.l + "%)"
              }
            ];
            break;
          case "value":
          default:
            var i = ut.hsvToHsl({ h: e.h, s: e.s, v: 100 });
            o = [
              { offset: "0", color: "#000" },
              {
                offset: "100",
                color: "hsl(" + i.h + ", " + i.s + "%, " + i.l + "%)"
              }
            ];
        }
        return p(
          "linearGradient",
          { id: this.uid },
          o.map(function(t) {
            return p("stop", { offset: t.offset + "%", "stop-color": t.color });
          })
        );
      }),
      (e.prototype.render = function(t) {
        var e = t.width,
          o = t.sliderHeight,
          n = t.borderWidth,
          r = t.handleRadius;
        (o = o || 2 * t.padding + 2 * r + 2 * n), (this.width = e);
        var i,
          s = (this.height = o) / 2,
          a = e - 2 * s,
          l = t.color.hsv;
        switch (t.sliderType) {
          case "hue":
            i = l.h /= 3.6;
            break;
          case "saturation":
            i = l.s;
            break;
          case "value":
          default:
            i = l.v;
        }
        return p(
          "svg",
          {
            class: "iro__slider",
            width: e,
            height: o,
            style: {
              marginTop: t.sliderMargin,
              overflow: "visible",
              display: "block"
            }
          },
          p("defs", null, this.renderGradient(t)),
          p("rect", {
            class: "iro__slider__value",
            rx: s,
            ry: s,
            x: n / 2,
            y: n / 2,
            width: e - n,
            height: o - n,
            "stroke-width": n,
            stroke: t.borderColor,
            fill: "url(" + F("#" + this.uid) + ")"
          }),
          p(G, {
            r: r,
            url: t.handleSvg,
            origin: t.handleOrigin,
            x: s + (i / 100) * a,
            y: o / 2
          })
        );
      }),
      (e.prototype.getValueFromPoint = function(t, e, o) {
        var n = o.left,
          r = this.width - this.height;
        t -= n + this.height / 2;
        var i = Math.max(Math.min(t, r), 0);
        return Math.round((100 / r) * i);
      }),
      (e.prototype.handleInput = function(t, e, o, n) {
        var r,
          i,
          s = this.getValueFromPoint(t, e, o);
        switch (this.props.sliderType) {
          case "hue":
            (i = "h"), (s *= 3.6);
            break;
          case "saturation":
            i = "s";
            break;
          case "value":
          default:
            i = "v";
        }
        this.props.onInput(n, (((r = {})[i] = s), r));
      }),
      e
    );
  })(t);
  var dt = (function(e) {
    function i(t) {
      e.call(this, t),
        this.emitHook("init:before"),
        (this._events = {}),
        (this._deferredEvents = {}),
        (this._colorUpdateActive = !1),
        (this._colorUpdateSrc = null),
        (this.id = t.id),
        (this.color = new ut(t.color)),
        this.deferredEmit("color:init", this.color, {
          h: !1,
          s: !1,
          v: !1,
          a: !1
        }),
        (this.color._onChange = this.updateColor.bind(this)),
        (this.state = Object.assign({}, t, { color: this.color, ref: void 0 })),
        this.emitHook("init:state"),
        t.layout
          ? (this.layout = t.layout)
          : (this.layout = [
              { component: q, options: {} },
              { component: ft, options: {} }
            ]),
        this.emitHook("init:after");
    }
    return (
      e && (i.__proto__ = e),
      (((i.prototype = Object.create(
        e && e.prototype
      )).constructor = i).prototype.on = function(t, e) {
        var o = this,
          n = this._events;
        (Array.isArray(t) ? t : [t]).forEach(function(t) {
          o.emitHook("event:on", t, e),
            (n[t] || (n[t] = [])).push(e),
            o._deferredEvents[t] &&
              (o._deferredEvents[t].forEach(function(t) {
                e.apply(null, t);
              }),
              (o._deferredEvents[t] = []));
        });
      }),
      (i.prototype.off = function(t, o) {
        var n = this;
        (Array.isArray(t) ? t : [t]).forEach(function(t) {
          var e = n._events[t];
          n.emitHook("event:off", t, o), e && e.splice(e.indexOf(o), 1);
        });
      }),
      (i.prototype.emit = function(t) {
        for (var e, o = [], n = arguments.length - 1; 0 < n--; )
          o[n] = arguments[n + 1];
        (e = this).emitHook.apply(e, [t].concat(o));
        for (var r = this._events[t] || [], i = 0; i < r.length; i++)
          r[i].apply(this, o);
      }),
      (i.prototype.deferredEmit = function(t) {
        for (var e, o = [], n = arguments.length - 1; 0 < n--; )
          o[n] = arguments[n + 1];
        var r = this._deferredEvents;
        (e = this).emit.apply(e, [t].concat(o)), (r[t] || (r[t] = [])).push(o);
      }),
      (i.prototype.resize = function(t) {
        this.setState({ width: t });
      }),
      (i.prototype.reset = function() {
        this.color.set(this.props.color);
      }),
      (i.addHook = function(t, e) {
        var o = i.pluginHooks;
        (o[t] || (o[t] = [])).push(e);
      }),
      (i.prototype.emitHook = function(t) {
        for (var e = [], o = arguments.length - 1; 0 < o--; )
          e[o] = arguments[o + 1];
        for (var n = i.pluginHooks[t] || [], r = 0; r < n.length; r++)
          n[r].apply(this, e);
      }),
      (i.prototype.onMount = function(t) {
        (this.el = t), this.deferredEmit("mount", this);
      }),
      (i.prototype.updateColor = function(t, e) {
        this.emitHook("color:beforeUpdate", t, e),
          this.setState({ color: t }),
          this.emitHook("color:afterUpdate", t, e),
          this._colorUpdateActive ||
            ((this._colorUpdateActive = !0),
            "input" == this._colorUpdateSrc && this.emit("input:change", t, e),
            this.emit("color:change", t, e),
            (this._colorUpdateActive = !1));
      }),
      (i.prototype.handleInput = function(t, e) {
        "START" === t && this.emit("input:start", this.color),
          "MOVE" === t && this.emit("input:move", this.color),
          (this._colorUpdateSrc = "input"),
          (this.color.hsv = e),
          "END" === t && this.emit("input:end", this.color),
          (this._colorUpdateSrc = null);
      }),
      (i.prototype.render = function(t, n) {
        var r = this;
        return p(
          "div",
          {
            class: "iro__colorPicker",
            id: t.id,
            style: { display: n.display, width: n.width }
          },
          this.layout.map(function(t) {
            var e = t.component,
              o = t.options;
            return p(
              e,
              Object.assign({}, n, o, {
                onInput: function(t, e) {
                  return r.handleInput(t, e);
                },
                parent: r
              })
            );
          })
        );
      }),
      i
    );
  })(y);
  (dt.pluginHooks = {}),
    (dt.defaultProps = {
      width: 300,
      height: 300,
      handleRadius: 8,
      handleSvg: null,
      handleOrigin: { x: 0, y: 0 },
      color: "#fff",
      borderColor: "#fff",
      borderWidth: 0,
      display: "block",
      id: null,
      wheelLightness: !0,
      wheelAngle: 0,
      wheelDirection: "anticlockwise",
      sliderHeight: null,
      sliderMargin: 12,
      padding: 6,
      layout: null
    });
  var vt,
    gt,
    _t,
    mt,
    yt =
      (((gt = function(e, t) {
        var o,
          n,
          r,
          i = null,
          s = document.createElement("div");
        return (
          (o = p(
            vt,
            Object.assign(
              {},
              {
                ref: function(t) {
                  return (i = t);
                }
              },
              t
            )
          )),
          A(n, o, {}, !1, s, !1),
          (r = function() {
            var t = e instanceof Element ? e : document.querySelector(e);
            t.appendChild(i.base), i.onMount(t);
          }),
          "loading" !== document.readyState
            ? r()
            : b(document, ["DOMContentLoaded"], r),
          i
        );
      }).prototype = (vt = dt).prototype),
      Object.assign(gt, vt),
      (gt.__component = vt),
      gt);
  return (
    (mt = []),
    ((_t = {
      Color: ut,
      ColorPicker: yt,
      ui: { h: p, Component: t, Handle: G, Slider: ft, Wheel: q },
      util: {
        resolveUrl: F,
        createArcPath: $,
        parseUnit: X,
        parseHexInt: Y,
        intToHex: J
      },
      version: "4.5.3"
    }).use = function(t, e) {
      void 0 === e && (e = {}), -1 < mt.indexOf(t) || (t(_t, e), mt.push(t));
    }),
    (_t.installedPlugins = mt),
    _t
  );
});
//# sourceMappingURL=iro.min.js.map
