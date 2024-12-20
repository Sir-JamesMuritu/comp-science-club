import { $, z as zr, E as El, b as b$1, c as Ur, h as hs, C as Cs, m as be, t as tr, V as Vl, n as ie, v as vs, F as Fl, P as Pl, o as Qi, U as Ut, J as Je, X as Xl, D as Dl, O, p as Jl, Z as Zl, d as Ls, q as bl, w as pl, L as Ll } from "./indexhtml-BRa8D7LS.js";
import { g as g$1, h } from "./state-DPJamuGL-DTrBXV8o.js";
import { p as p$1, b as b$2 } from "./overlay-monkeypatch-6lcqoKWh-DINfj6Ve.js";
import { r as r$1 } from "./icons-ByP4XzDp-CVUiyp7R.js";
import { K as K$1 } from "./react-utils-DFD62MFY-DV-Nu30T.js";
import { showNotification as N$1, dismissNotification as m$1 } from "./copilot-notification-ov4Kfahu-RufFw3TU.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ht(t) {
  return (e, o) => {
    const n = typeof e == "function" ? e : e[o];
    Object.assign(n, t);
  };
}
const F = "@keyframes bounce{0%{transform:scale(.8)}50%{transform:scale(1.5)}to{transform:scale(1)}}@keyframes pulse{0%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 transparent}25%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 var(--pulse-first-color, var(--selection-color))}50%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 transparent}75%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 var(--pulse-second-color, var(--accent-color))}to{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 transparent}}@keyframes around-we-go-again{0%{background-position:0 0,0 0,calc(var(--glow-size) * -.5) calc(var(--glow-size) * -.5),calc(100% + calc(var(--glow-size) * .5)) calc(100% + calc(var(--glow-size) * .5))}25%{background-position:0 0,0 0,calc(100% + calc(var(--glow-size) * .5)) calc(var(--glow-size) * -.5),calc(var(--glow-size) * -.5) calc(100% + calc(var(--glow-size) * .5))}50%{background-position:0 0,0 0,calc(100% + calc(var(--glow-size) * .5)) calc(100% + calc(var(--glow-size) * .5)),calc(var(--glow-size) * -.5) calc(var(--glow-size) * -.5)}75%{background-position:0 0,0 0,calc(var(--glow-size) * -.5) calc(100% + calc(var(--glow-size) * .5)),calc(100% + calc(var(--glow-size) * .5)) calc(var(--glow-size) * -.5)}to{background-position:0 0,0 0,calc(var(--glow-size) * -.5) calc(var(--glow-size) * -.5),calc(100% + calc(var(--glow-size) * .5)) calc(100% + calc(var(--glow-size) * .5))}}@keyframes swirl{0%{rotate:0deg;filter:hue-rotate(20deg)}50%{filter:hue-rotate(-30deg)}to{rotate:360deg;filter:hue-rotate(20deg)}}";
var gt = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, x = (t, e, o, n) => {
  for (var i = n > 1 ? void 0 : n ? pt(e, o) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (i = (n ? s(e, o, i) : s(i)) || i);
  return n && i && gt(e, o, i), i;
};
const B = "data-drag-initial-index", D = "data-drag-final-index";
let b = class extends Cs {
  constructor() {
    super(...arguments), this.position = "right", this.opened = false, this.keepOpen = false, this.resizing = false, this.closingForcefully = false, this.draggingSectionPanel = null, this.activationAnimationTransitionEndListener = () => {
      this.style.removeProperty("--closing-delay"), this.style.removeProperty("--initial-position"), this.removeEventListener("transitionend", this.activationAnimationTransitionEndListener);
    }, this.resizingMouseMoveListener = (t) => {
      if (!this.resizing)
        return;
      const { x: e, y: o } = t;
      t.stopPropagation(), t.preventDefault(), requestAnimationFrame(() => {
        let n;
        if (this.position === "right") {
          const i = document.body.clientWidth - e;
          this.style.setProperty("--size", `${i}px`), be.saveDrawerSize(this.position, i), n = { width: i };
        } else if (this.position === "left") {
          const i = e;
          this.style.setProperty("--size", `${i}px`), be.saveDrawerSize(this.position, i), n = { width: i };
        } else if (this.position === "bottom") {
          const i = document.body.clientHeight - o;
          this.style.setProperty("--size", `${i}px`), be.saveDrawerSize(this.position, i), n = { height: i };
        }
        tr.panels.filter((i) => !i.floating && i.panel === this.position).forEach((i) => {
          tr.updatePanel(i.tag, n);
        });
      });
    }, this.sectionPanelDraggingStarted = (t, e) => {
      this.draggingSectionPanel = t, $.emit("user-select", { allowSelection: false }), this.draggingSectionPointerStartY = e.clientY, t.toggleAttribute("dragging", true), t.style.zIndex = "1000", Array.from(this.querySelectorAll("copilot-section-panel-wrapper")).forEach((o, n) => {
        o.setAttribute(B, `${n}`);
      }), document.addEventListener("mousemove", this.sectionPanelDragging), document.addEventListener("mouseup", this.sectionPanelDraggingFinished);
    }, this.sectionPanelDragging = (t) => {
      if (!this.draggingSectionPanel)
        return;
      const { clientX: e, clientY: o } = t;
      if (!Vl(this.getBoundingClientRect(), e, o)) {
        this.cleanUpDragging();
        return;
      }
      const n = o - this.draggingSectionPointerStartY;
      this.draggingSectionPanel.style.transform = `translateY(${n}px)`, this.updateSectionPanelPositionsWhileDragging();
    }, this.sectionPanelDraggingFinished = () => {
      if (!this.draggingSectionPanel)
        return;
      $.emit("user-select", { allowSelection: true });
      const t = this.getAllPanels().filter(
        (e) => e.hasAttribute(D) && e.panelInfo?.panelOrder !== Number.parseInt(e.getAttribute(D), 10)
      ).map((e) => ({
        tag: e.panelTag,
        order: Number.parseInt(e.getAttribute(D), 10)
      }));
      this.cleanUpDragging(), tr.updateOrders(t), document.removeEventListener("mouseup", this.sectionPanelDraggingFinished), document.removeEventListener("mousemove", this.sectionPanelDragging);
    }, this.updateSectionPanelPositionsWhileDragging = () => {
      const t = this.draggingSectionPanel.getBoundingClientRect().height;
      this.getAllPanels().sort((e, o) => {
        const n = e.getBoundingClientRect(), i = o.getBoundingClientRect(), r = (n.top + n.bottom) / 2, s = (i.top + i.bottom) / 2;
        return r - s;
      }).forEach((e, o) => {
        if (e.setAttribute(D, `${o}`), e.panelTag !== this.draggingSectionPanel?.panelTag) {
          const n = Number.parseInt(e.getAttribute(B), 10);
          n > o ? e.style.transform = `translateY(${-t}px)` : n < o ? e.style.transform = `translateY(${t}px)` : e.style.removeProperty("transform");
        }
      });
    };
  }
  static get styles() {
    return [
      ie(F),
      vs`
        :host {
          --size: 350px;
          --min-size: 20%;
          --max-size: 80%;
          --default-content-height: 300px;
          --transition-duration: var(--duration-2);
          --opening-delay: var(--duration-2);
          --closing-delay: var(--duration-3);
          --hover-size: 18px;
          --pulse-size: var(--hover-size);
          --pulse-animation-duration: 8s;
          --initial-position: 0px;
          position: absolute;
          z-index: var(--z-index-drawer);
          transition: translate var(--transition-duration) var(--closing-delay);
        }

        :host([no-transition]),
        :host([no-transition]) .container {
          transition: none;
          -webkit-transition: none;
          -moz-transition: none;
          -o-transition: none;
        }

        :host(:is([position='left'], [position='right'])) {
          width: var(--size);
          min-width: var(--min-size);
          max-width: var(--max-size);
          top: 0;
          bottom: 0;
        }

        :host([position='left']) {
          left: var(--initial-position);
          translate: calc(-100% + var(--hover-size)) 0%;
          padding-right: var(--hover-size);
        }

        :host([position='right']) {
          right: var(--initial-position);
          translate: calc(100% - var(--hover-size)) 0%;
          padding-left: var(--hover-size);
        }

        :host([position='bottom']) {
          height: var(--size);
          min-height: var(--min-size);
          max-height: var(--max-size);
          bottom: var(--initial-position);
          left: 0;
          right: 0;
          translate: 0% calc(100% - var(--hover-size));
          padding-top: var(--hover-size);
        }

        /* The visible container. Needed to have extra space for hover and resize handle outside it. */

        .container {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          background: var(--surface);
          -webkit-backdrop-filter: var(--surface-backdrop-filter);
          backdrop-filter: var(--surface-backdrop-filter);
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: var(--surface-box-shadow-2);
          transition:
            opacity var(--transition-duration) var(--closing-delay),
            visibility calc(var(--transition-duration) * 2) var(--closing-delay);
          opacity: 0;
          /* For accessibility (restored when open) */
          visibility: hidden;
        }

        :host([position='left']) .container {
          border-right: 1px solid var(--surface-border-color);
        }

        :host([position='right']) .container {
          border-left: 1px solid var(--surface-border-color);
        }

        :host([position='bottom']) .container {
          border-top: 1px solid var(--surface-border-color);
        }

        /* Opened state */

        :host(:is([opened], [keepopen])) {
          translate: 0% 0%;
          transition-delay: var(--opening-delay);
          z-index: var(--z-index-opened-drawer);
        }

        :host(:is([opened], [keepopen])) .container {
          transition-delay: var(--opening-delay);
          visibility: visible;
          opacity: 1;
        }

        .resize {
          position: absolute;
          z-index: 10;
          inset: 0;
        }

        :host(:is([position='left'], [position='right'])) .resize {
          width: var(--hover-size);
          cursor: col-resize;
        }

        :host([position='left']) .resize {
          left: auto;
          right: calc(var(--hover-size) * 0.5);
        }

        :host([position='right']) .resize {
          right: auto;
          left: calc(var(--hover-size) * 0.5);
        }

        :host([position='bottom']) .resize {
          height: var(--hover-size);
          bottom: auto;
          top: calc(var(--hover-size) * 0.5);
          cursor: row-resize;
        }

        :host([resizing]) .container {
          /* vaadin-grid (used in the outline) blocks the mouse events */
          pointer-events: none;
        }

        /* Visual indication of the drawer */

        :host::before {
          content: '';
          position: absolute;
          pointer-events: none;
          z-index: -1;
          inset: var(--hover-size);
          transition: opacity var(--transition-duration) var(--closing-delay);
          animation: pulse var(--pulse-animation-duration) infinite;
        }
        :host([document-hidden])::before {
          animation: none;
        }

        :host([attention-required]) {
          --pulse-animation-duration: 2s;
          --pulse-first-color: var(--red-500);
          --pulse-second-color: var(--red-800);
        }

        :host(:is([opened], [keepopen]))::before {
          transition-delay: var(--opening-delay);
          opacity: 0;
        }
        .hasmore {
          position: absolute;
          bottom: 0;
          width: 100%;

          text-align: center;
          padding-bottom: 0.5em;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--surface-2));
          padding-top: 2em;
          display: none;
        }
        .hasmoreContainer {
          height: 100%;
          position: relative;
        }
        :host([position='left']) .hasmoreContainer[canscroll] .hasmore,
        :host([position='right']) .hasmoreContainer[canscroll] .hasmore {
          display: block;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => tr.panels,
      () => this.requestUpdate()
    ), this.reaction(
      () => b$1.operationInProgress,
      (e) => {
        e === Fl.DragAndDrop && !this.opened && !this.keepOpen ? this.style.setProperty("pointer-events", "none") : this.style.setProperty("pointer-events", "auto");
      }
    ), this.reaction(
      () => tr.getAttentionRequiredPanelConfiguration(),
      () => {
        const e = tr.getAttentionRequiredPanelConfiguration();
        e && !e.floating && this.toggleAttribute(Pl, e.panel === this.position);
      }
    ), this.reaction(
      () => b$1.active,
      () => {
        if (!b$1.active || !Qi.isActivationAnimation() || b$1.activatedFrom === "restore" || b$1.activatedFrom === "test")
          return;
        const e = tr.getAttentionRequiredPanelConfiguration();
        e && !e.floating && e.panel === this.position || (this.addEventListener("transitionend", this.activationAnimationTransitionEndListener), this.toggleAttribute("no-transition", true), this.opened = true, this.style.setProperty("--closing-delay", "var(--duration-1)"), this.style.setProperty("--initial-position", "calc(-1 * (max(var(--size), var(--min-size)) * 1) / 3)"), requestAnimationFrame(() => {
          this.toggleAttribute("no-transition", false), this.opened = false;
        }));
      }
    ), document.addEventListener("mouseup", () => {
      this.resizing = false, b$1.setDrawerResizing(false), this.removeAttribute("resizing"), $.emit("user-select", { allowSelection: true });
    });
    const t = be.getDrawerSize(this.position);
    t && this.style.setProperty("--size", `${t}px`), document.addEventListener("mousemove", this.resizingMouseMoveListener), this.addEventListener("mouseenter", this.mouseEnterListener), $.on("document-activation-change", (e) => {
      this.toggleAttribute("document-hidden", !e.detail.active);
    });
  }
  firstUpdated(t) {
    super.firstUpdated(t), requestAnimationFrame(() => this.toggleAttribute("no-transition", false)), this.resizeElement.addEventListener("mousedown", (e) => {
      e.button === 0 && (this.resizing = true, b$1.setDrawerResizing(true), this.setAttribute("resizing", ""), $.emit("user-select", { allowSelection: false }));
    });
  }
  updated(t) {
    super.updated(t), t.has("opened") && this.opened && this.hasAttribute(Pl) && (this.removeAttribute(Pl), tr.clearAttention()), this.updateScrollable();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mousemove", this.resizingMouseMoveListener), this.removeEventListener("mouseenter", this.mouseEnterListener);
  }
  /**
   * Cleans up attributes/styles etc... for dragging operations
   * @private
   */
  cleanUpDragging() {
    this.draggingSectionPanel && (b$1.setSectionPanelDragging(false), this.draggingSectionPanel.style.zIndex = "", Array.from(this.querySelectorAll("copilot-section-panel-wrapper")).forEach((t) => {
      t.style.removeProperty("transform"), t.removeAttribute(D), t.removeAttribute(B);
    }), this.draggingSectionPanel.removeAttribute("dragging"), this.draggingSectionPanel = null);
  }
  getAllPanels() {
    return Array.from(this.querySelectorAll("copilot-section-panel-wrapper"));
  }
  /**
   * Closes the drawer and disables mouse enter event for a while.
   */
  forceClose() {
    this.closingForcefully = true, this.opened = false, setTimeout(() => {
      this.closingForcefully = false;
    }, 0.5);
  }
  mouseEnterListener(t) {
    if (this.closingForcefully || b$1.sectionPanelResizing)
      return;
    document.querySelector("copilot-main").shadowRoot.querySelector("copilot-drawer-panel[opened]") || (this.opened = true);
  }
  render() {
    return Ut`
      <div class="hasmoreContainer">
        <div class="container" @scroll=${this.updateScrollable}>
          <slot></slot>
        </div>
        <div class="hasmore">⌄</div>
      </div>
      <div class="resize"></div>
    `;
  }
  updateScrollable() {
    this.hasmoreContainer.toggleAttribute(
      "canscroll",
      this.container.scrollHeight - this.container.scrollTop - this.container.clientHeight > 10
    );
  }
};
x([
  h({ reflect: true, attribute: true })
], b.prototype, "position", 2);
x([
  h({ reflect: true, type: Boolean })
], b.prototype, "opened", 2);
x([
  h({ reflect: true, type: Boolean })
], b.prototype, "keepOpen", 2);
x([
  p$1(".container")
], b.prototype, "container", 2);
x([
  p$1(".hasmoreContainer")
], b.prototype, "hasmoreContainer", 2);
x([
  p$1(".resize")
], b.prototype, "resizeElement", 2);
x([
  ht({ passive: true })
], b.prototype, "updateScrollable", 1);
b = x([
  hs("copilot-drawer-panel")
], b);
var ut = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, Z = (t, e, o, n) => {
  for (var i = n > 1 ? void 0 : n ? vt(e, o) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (i = (n ? s(e, o, i) : s(i)) || i);
  return n && i && ut(e, o, i), i;
};
let N = class extends Je {
  constructor() {
    super(...arguments), this.checked = false;
  }
  static get styles() {
    return vs`
      .switch {
        display: inline-flex;
        align-items: center;
        gap: var(--space-100);
      }

      .switch input {
        display: none;
      }

      .slider {
        background-color: var(--gray-300);
        border-radius: 9999px;
        cursor: pointer;
        inset: 0;
        position: absolute;
        transition: 0.4s;
        height: 0.75rem;
        position: relative;
        width: 1.5rem;
        min-width: 1.5rem;
      }

      .slider:before {
        background-color: white;
        border-radius: 50%;
        bottom: 1px;
        content: '';
        height: 0.625rem;
        left: 1px;
        position: absolute;
        transition: 0.4s;
        width: 0.625rem;
      }

      input:checked + .slider {
        background-color: var(--selection-color);
      }

      input:checked + .slider:before {
        transform: translateX(0.75rem);
      }

      label:has(input:focus) {
        outline: 2px solid var(--selection-color);
        outline-offset: 2px;
      }
    `;
  }
  render() {
    return Ut`
      <label class="switch">
        <input
          class="feature-toggle"
          id="feature-toggle-${this.id}"
          type="checkbox"
          ?checked="${this.checked}"
          @change=${(t) => {
      t.preventDefault(), this.checked = t.target.checked, this.dispatchEvent(new CustomEvent("on-change"));
    }} />
        <span class="slider"></span>
        ${this.title}
      </label>
    `;
  }
  //  @change=${(e: InputEvent) => this.toggleFeatureFlag(e, feature)}
};
Z([
  h({ reflect: true, type: Boolean })
], N.prototype, "checked", 2);
N = Z([
  hs("copilot-toggle-button")
], N);
function p(t, e) {
  const o = document.createElement(t);
  if (e.style && (o.className = e.style), e.icon)
    if (typeof e.icon == "string") {
      const n = document.createElement("vaadin-icon");
      n.setAttribute("icon", e.icon), o.append(n);
    } else
      o.append(ft(e.icon.strings[0]));
  if (e.label) {
    const n = document.createElement("span");
    n.className = "label", n.innerHTML = e.label, o.append(n);
  }
  if (e.hint) {
    const n = document.createElement("span");
    n.className = "hint", n.innerHTML = e.hint, o.append(n);
  }
  return o;
}
function ft(t) {
  if (!t) return null;
  const e = document.createElement("template");
  e.innerHTML = t;
  const o = e.content.children;
  return o.length === 1 ? o[0] : o;
}
class mt {
  constructor() {
    this.offsetX = 0, this.offsetY = 0;
  }
  draggingStarts(e, o) {
    this.offsetX = o.clientX - e.getBoundingClientRect().left, this.offsetY = o.clientY - e.getBoundingClientRect().top;
  }
  dragging(e, o) {
    const n = o.clientX, i = o.clientY, r = n - this.offsetX, s = n - this.offsetX + e.getBoundingClientRect().width, c = i - this.offsetY, h2 = i - this.offsetY + e.getBoundingClientRect().height;
    return this.adjust(e, r, c, s, h2);
  }
  adjust(e, o, n, i, r) {
    let s, c, h2, P;
    const I = document.documentElement.getBoundingClientRect().width, C = document.documentElement.getBoundingClientRect().height;
    return (i + o) / 2 < I / 2 ? (e.style.setProperty("--left", `${o}px`), e.style.setProperty("--right", ""), P = void 0, s = Math.max(0, o)) : (e.style.removeProperty("--left"), e.style.setProperty("--right", `${I - i}px`), s = void 0, P = Math.max(0, I - i)), (n + r) / 2 < C / 2 ? (e.style.setProperty("--top", `${n}px`), e.style.setProperty("--bottom", ""), h2 = void 0, c = Math.max(0, n)) : (e.style.setProperty("--top", ""), e.style.setProperty("--bottom", `${C - r}px`), c = void 0, h2 = Math.max(0, C - r)), {
      left: s,
      right: P,
      top: c,
      bottom: h2
    };
  }
  anchor(e) {
    const { left: o, top: n, bottom: i, right: r } = e.getBoundingClientRect();
    return this.adjust(e, o, n, r, i);
  }
  anchorLeftTop(e) {
    const { left: o, top: n } = e.getBoundingClientRect();
    return e.style.setProperty("--left", `${o}px`), e.style.setProperty("--right", ""), e.style.setProperty("--top", `${n}px`), e.style.setProperty("--bottom", ""), {
      left: o,
      top: n
    };
  }
}
const m = new mt();
var bt = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, q = (t, e, o, n) => {
  for (var i = n > 1 ? void 0 : n ? wt(e, o) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (i = (n ? s(e, o, i) : s(i)) || i);
  return n && i && bt(e, o, i), i;
};
const yt = 8;
let T = class extends Cs {
  constructor() {
    super(...arguments), this.initialMouseDownPosition = null, this.dragging = false, this.mouseDownListener = (t) => {
      this.initialMouseDownPosition = { x: t.clientX, y: t.clientY }, m.draggingStarts(this, t), document.addEventListener("mousemove", this.documentDraggingMouseMoveEventListener);
    }, this.documentDraggingMouseMoveEventListener = (t) => {
      if (this.initialMouseDownPosition && !this.dragging) {
        const { clientX: e, clientY: o } = t;
        this.dragging = Math.abs(e - this.initialMouseDownPosition.x) + Math.abs(o - this.initialMouseDownPosition.y) > yt;
      }
      this.dragging && (this.setOverlayVisibility(false), m.dragging(this, t));
    }, this.documentMouseUpListener = (t) => {
      if (this.dragging) {
        const e = m.dragging(this, t);
        Qi.setActivationButtonPosition(e), this.setOverlayVisibility(true);
      }
      this.dragging = false, this.initialMouseDownPosition = null, document.removeEventListener("mousemove", this.documentDraggingMouseMoveEventListener), this.setMenuBarOnClick();
    }, this.dispatchSpotlightActivationEvent = (t) => {
      this.dispatchEvent(
        new CustomEvent("spotlight-activation-changed", {
          detail: t
        })
      );
    }, this.activationBtnClicked = (t) => {
      if (this.dragging) {
        t?.stopPropagation(), this.dragging = false;
        return;
      }
      if (b$1.active && this.handleAttentionRequiredOnClick()) {
        t?.stopPropagation(), t?.preventDefault();
        return;
      }
      t?.stopPropagation(), this.dispatchEvent(new CustomEvent("activation-btn-clicked"));
    }, this.handleAttentionRequiredOnClick = () => {
      const t = tr.getAttentionRequiredPanelConfiguration();
      return t ? t.panel && !t.floating ? ($.emit("open-attention-required-drawer", null), true) : (tr.clearAttention(), true) : false;
    }, this.setMenuBarOnClick = () => {
      const t = this.shadowRoot.querySelector("vaadin-menu-bar-button");
      t && (t.onclick = this.activationBtnClicked);
    };
  }
  static get styles() {
    return [
      ie(F),
      vs`
        :host {
          --space: 8px;
          --height: 28px;
          --width: 28px;
          position: absolute;
          top: clamp(var(--space), var(--top), calc(100vh - var(--height) - var(--space)));
          left: clamp(var(--space), var(--left), calc(100vw - var(--width) - var(--space)));
          bottom: clamp(var(--space), var(--bottom), calc(100vh - var(--height) - var(--space)));
          right: clamp(var(--space), var(--right), calc(100vw - var(--width) - var(--space)));
          user-select: none;
          -ms-user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          /* Don't add a z-index or anything else that creates a stacking context */
        }
        :host([document-hidden]) {
          -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
          filter: grayscale(100%);
        }

        .menu-button::part(container) {
          overflow: visible;
        }

        .menu-button vaadin-menu-bar-button {
          all: initial;
          display: block;
          position: relative;
          z-index: var(--z-index-activation-button);
          width: var(--width);
          height: var(--height);
          overflow: hidden;
          color: transparent;
          background: hsl(0 0% 0% / 0.25);
          border-radius: 8px;
          box-shadow: 0 0 0 1px hsl(0 0% 100% / 0.1);
          cursor: default;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition:
            box-shadow 0.2s,
            background-color 0.2s;
        }

        /* pointer-events property is set when the menu is open */

        .menu-button[style*='pointer-events'] + .monkey-patch-close-on-hover {
          position: fixed; /* escapes the host positioning context */
          inset: 0;
          bottom: 40px;
          z-index: calc(var(--z-index-popover) - 1);
          pointer-events: auto;
        }

        /* visual effect when active */

        .menu-button vaadin-menu-bar-button::before {
          all: initial;
          content: '';
          position: absolute;
          inset: -6px;
          background-image: radial-gradient(circle at 50% -10%, hsl(221 100% 55% / 0.6) 0%, transparent 60%),
            radial-gradient(circle at 25% 40%, hsl(303 71% 64%) 0%, transparent 70%),
            radial-gradient(circle at 80% 10%, hsla(262, 38%, 9%, 0.5) 0%, transparent 80%),
            radial-gradient(circle at 110% 50%, hsla(147, 100%, 77%, 1) 20%, transparent 100%);
          animation: 5s swirl linear infinite;
          animation-play-state: paused;
          opacity: 0;
          transition: opacity 0.5s;
        }

        /* vaadin symbol */

        .menu-button vaadin-menu-bar-button::after {
          all: initial;
          content: '';
          position: absolute;
          inset: 1px;
          background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7407 9.70401C12.7407 9.74417 12.7378 9.77811 12.7335 9.81479C12.7111 10.207 12.3897 10.5195 11.9955 10.5195C11.6014 10.5195 11.2801 10.209 11.2577 9.8169C11.2534 9.7801 11.2504 9.74417 11.2504 9.70401C11.2504 9.31225 11.1572 8.90867 10.2102 8.90867H7.04307C5.61481 8.90867 5 8.22698 5 6.86345V5.70358C5 5.31505 5.29521 5 5.68008 5C6.06495 5 6.35683 5.31505 6.35683 5.70358V6.09547C6.35683 6.53423 6.655 6.85413 7.307 6.85413H10.4119C11.8248 6.85413 11.9334 7.91255 11.98 8.4729H12.0111C12.0577 7.91255 12.1663 6.85413 13.5791 6.85413H16.6841C17.3361 6.85413 17.614 6.54529 17.614 6.10641L17.6158 5.70358C17.6158 5.31505 17.9246 5 18.3095 5C18.6943 5 19 5.31505 19 5.70358V6.86345C19 8.22698 18.3763 8.90867 16.9481 8.90867H13.7809C12.8338 8.90867 12.7407 9.31225 12.7407 9.70401Z" fill="white"/><path d="M12.7536 17.7785C12.6267 18.0629 12.3469 18.2608 12.0211 18.2608C11.6907 18.2608 11.4072 18.0575 11.2831 17.7668C11.2817 17.7643 11.2803 17.7619 11.279 17.7595C11.2761 17.7544 11.2732 17.7495 11.2704 17.744L8.45986 12.4362C8.3821 12.2973 8.34106 12.1399 8.34106 11.9807C8.34106 11.4732 8.74546 11.0603 9.24238 11.0603C9.64162 11.0603 9.91294 11.2597 10.0985 11.6922L12.0216 15.3527L13.9468 11.6878C14.1301 11.2597 14.4014 11.0603 14.8008 11.0603C15.2978 11.0603 15.7021 11.4732 15.7021 11.9807C15.7021 12.1399 15.6611 12.2973 15.5826 12.4374L12.7724 17.7446C12.7683 17.7524 12.7642 17.7597 12.7601 17.767C12.7579 17.7708 12.7557 17.7746 12.7536 17.7785Z" fill="white"/></svg>');
          background-size: 100%;
        }

        .menu-button vaadin-menu-bar-button[focus-ring] {
          outline: 2px solid var(--selection-color);
          outline-offset: 2px;
        }

        .menu-button vaadin-menu-bar-button:hover {
          background: hsl(0 0% 0% / 0.8);
          box-shadow:
            0 0 0 1px hsl(0 0% 100% / 0.1),
            0 2px 8px -1px hsl(0 0% 0% / 0.3);
        }

        :host([active]) .menu-button vaadin-menu-bar-button {
          background-color: transparent;
          box-shadow:
            inset 0 0 0 1px hsl(0 0% 0% / 0.2),
            0 2px 8px -1px hsl(0 0% 0% / 0.3);
        }

        :host([active]) .menu-button vaadin-menu-bar-button::before {
          opacity: 1;
          animation-play-state: running;
        }

        :host([attention-required]) {
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        :host([attention-required]) [part='attention-required-indicator'] {
          top: -1px;
          right: -1px;
          width: 6px;
          height: 6px;
          box-sizing: border-box;
          border-radius: 100%;
          position: absolute;
          background: var(--red-500);
          z-index: calc(var(--z-index-activation-button) + 1);
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => tr.attentionRequiredPanelTag,
      () => {
        this.toggleAttribute(Pl, tr.attentionRequiredPanelTag !== null);
      }
    ), this.reaction(
      () => b$1.active,
      () => {
        this.toggleAttribute("active", b$1.active);
      },
      { fireImmediately: true }
    ), this.addEventListener("mousedown", this.mouseDownListener), document.addEventListener("mouseup", this.documentMouseUpListener);
    const t = Qi.getActivationButtonPosition();
    t ? (this.style.setProperty("--left", `${t.left}px`), this.style.setProperty("--bottom", `${t.bottom}px`), this.style.setProperty("--right", `${t.right}px`), this.style.setProperty("--top", `${t.top}px`)) : (this.style.setProperty("--bottom", "var(--space)"), this.style.setProperty("--right", "var(--space)")), $.on("document-activation-change", (e) => {
      this.toggleAttribute("document-hidden", !e.detail.active);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.mouseDownListener), document.removeEventListener("mouseup", this.documentMouseUpListener);
  }
  /**
   * To hide overlay while dragging
   * @param visible
   */
  setOverlayVisibility(t) {
    const e = this.shadowRoot.querySelector("vaadin-menu-bar-button").__overlay;
    t ? (e?.style.setProperty("display", "flex"), e?.style.setProperty("visibility", "visible")) : (e?.style.setProperty("display", "none"), e?.style.setProperty("visibility", "invisible"));
  }
  render() {
    const t = [
      {
        text: "Vaadin Copilot",
        children: [
          {
            component: p("vaadin-menu-bar-item", {
              label: '<span class="deactivate">Deactivate</span><span class="activate">Activate</span> Copilot',
              hint: Qi.isActivationShortcut() ? Xl.toggleCopilot : void 0
            }),
            action: "copilot"
          },
          {
            component: p("vaadin-menu-bar-item", {
              label: "Toggle Command Window",
              hint: Xl.toggleCommandWindow,
              style: "toggle-spotlight"
            }),
            action: "spotlight"
          }
        ]
      }
    ];
    return b$1.active && (b$1.idePluginState?.supportedActions?.find((e) => e === "undo") && (t[0].children = [
      {
        component: p("vaadin-menu-bar-item", {
          label: "Undo",
          hint: Xl.undo
        }),
        action: "undo"
      },
      {
        component: p("vaadin-menu-bar-item", {
          label: "Redo",
          hint: Xl.redo
        }),
        action: "redo"
      },
      ...t[0].children
    ]), t[0].children = [
      {
        component: p("vaadin-menu-bar-item", {
          label: "Tell us what you think"
          // Label used also in ScreenshotsIT.java
        }),
        action: "feedback"
      },
      {
        component: p("vaadin-menu-bar-item", {
          label: "Show welcome message"
        }),
        action: "welcome"
      },
      {
        component: p("vaadin-menu-bar-item", {
          label: "Show keyboard shortcuts"
        }),
        action: "shortcuts"
      },
      {
        component: "hr"
      },
      ...t[0].children,
      { component: "hr" },
      // Settings sub menu
      {
        text: "Settings",
        children: [
          {
            component: p("vaadin-menu-bar-item", {
              label: "Activation shortcut enabled",
              hint: Qi.isActivationShortcut() ? "✓" : void 0
            }),
            action: "shortcut"
          },
          {
            component: p("vaadin-menu-bar-item", {
              label: "Show animation when activating",
              hint: Qi.isActivationAnimation() ? "✓" : void 0
            }),
            action: "animate-on-activate"
          }
        ]
      }
    ]), Ut`
      <vaadin-menu-bar
        class="menu-button"
        .items="${t}"
        @item-selected="${(e) => {
      this.handleMenuItemClick(e.detail.value);
    }}"
        ?open-on-hover=${!this.dragging}
        overlay-class="activation-button-menu">
      </vaadin-menu-bar>
      <div class="monkey-patch-close-on-hover" @mouseenter="${this.closeMenu}"></div>
      <div part="attention-required-indicator"></div>
    `;
  }
  closeMenu() {
    this.menubar._close();
  }
  handleMenuItemClick(t) {
    switch (t.action) {
      case "copilot":
        this.activationBtnClicked();
        break;
      case "spotlight":
        b$1.setSpotlightActive(!b$1.spotlightActive);
        break;
      case "shortcut":
        Qi.setActivationShortcut(!Qi.isActivationShortcut());
        break;
      case "animate-on-activate":
        Qi.setActivationAnimation(!Qi.isActivationAnimation());
        break;
      case "undo":
      case "redo":
        $.emit("undoRedo", { undo: t.action === "undo" });
        break;
      case "feedback":
        tr.updatePanel("copilot-feedback-panel", {
          floating: true
        });
        break;
      case "welcome":
        b$1.setWelcomeActive(true), b$1.setSpotlightActive(true);
        break;
      case "shortcuts":
        tr.updatePanel("copilot-shortcuts-panel", {
          floating: true
        });
        break;
    }
  }
  firstUpdated() {
    this.setMenuBarOnClick(), b$2(this.shadowRoot);
  }
};
q([
  p$1("vaadin-menu-bar")
], T.prototype, "menubar", 2);
q([
  g$1()
], T.prototype, "dragging", 2);
T = q([
  hs("copilot-activation-button")
], T);
var xt = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, k = (t, e, o, n) => {
  for (var i = n > 1 ? void 0 : n ? Pt(e, o) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (i = (n ? s(e, o, i) : s(i)) || i);
  return n && i && xt(e, o, i), i;
};
const g = "resize-dir", _ = "floating-resizing-active";
let w = class extends Cs {
  constructor() {
    super(...arguments), this.panelTag = "", this.dockingItems = [
      {
        component: p("vaadin-context-menu-item", {
          icon: r$1.dockRight,
          label: "Dock right"
        }),
        panel: "right"
      },
      {
        component: p("vaadin-context-menu-item", {
          icon: r$1.dockLeft,
          label: "Dock left"
        }),
        panel: "left"
      },
      {
        component: p("vaadin-context-menu-item", {
          icon: r$1.dockBottom,
          label: "Dock bottom"
        }),
        panel: "bottom"
      }
    ], this.floatingResizingStarted = false, this.resizingInDrawerStarted = false, this.toggling = false, this.rectangleBeforeResizing = null, this.floatingResizeHandlerMouseMoveListener = (t) => {
      if (!this.panelInfo?.floating || this.floatingResizingStarted || !this.panelInfo?.expanded)
        return;
      const e = this.getBoundingClientRect(), o = Math.abs(t.clientX - e.x), n = Math.abs(e.x + e.width - t.clientX), i = Math.abs(t.clientY - e.y), r = Math.abs(e.y + e.height - t.clientY), s = Number.parseInt(
        window.getComputedStyle(this).getPropertyValue("--floating-offset-resize-threshold"),
        10
      );
      let c = "";
      if (o < s ? i < s ? (c = "nw-resize", this.setAttribute(g, "top left")) : r < s ? (c = "sw-resize", this.setAttribute(g, "bottom left")) : (c = "col-resize", this.setAttribute(g, "left")) : n < s ? i < s ? (c = "ne-resize", this.setAttribute(g, "top right")) : r < s ? (c = "se-resize", this.setAttribute(g, "bottom right")) : (c = "col-resize", this.setAttribute(g, "right")) : r < s ? (c = "row-resize", this.setAttribute(g, "bottom")) : i < s && (c = "row-resize", this.setAttribute(g, "top")), c !== "") {
        const h2 = window.getComputedStyle(this), P = Number.parseInt(h2.borderTopWidth, 10), I = Number.parseInt(h2.borderTopWidth, 10), C = Number.parseInt(h2.borderLeftWidth, 10), J = Number.parseInt(h2.borderRightWidth, 10);
        this.rectangleBeforeResizing = this.getBoundingClientRect(), this.rectangleBeforeResizing.width -= C + J, this.rectangleBeforeResizing.height -= P + I, this.style.setProperty("--resize-cursor", c);
      } else
        this.style.removeProperty("--resize-cursor"), this.removeAttribute(g);
      this.toggleAttribute(_, c !== "");
    }, this.floatingResizingMouseDownListener = (t) => {
      this.hasAttribute(_) && t.button === 0 && (t.stopPropagation(), t.preventDefault(), m.anchorLeftTop(this), this.floatingResizingStarted = true, this.toggleAttribute("resizing", true), Dl(() => {
        b$1.sectionPanelResizing = true;
      }));
    }, this.floatingResizingMouseLeaveListener = () => {
      this.panelInfo?.floating && (this.floatingResizingStarted || (this.removeAttribute("resizing"), this.removeAttribute(_), this.removeAttribute("dragging"), this.style.removeProperty("--resize-cursor"), this.removeAttribute(g)));
    }, this.floatingResizingMouseMoveListener = (t) => {
      if (!this.panelInfo?.floating || !this.floatingResizingStarted)
        return;
      const e = this.getAttribute(g);
      if (e === null)
        return;
      t.stopPropagation(), t.preventDefault();
      const { clientX: o, clientY: n } = t, i = e.split(" "), r = this.rectangleBeforeResizing;
      if (i.includes("left")) {
        const s = Math.max(0, o);
        this.setFloatingResizeDirectionProps("left", s, r.left - s + r.width);
      }
      if (i.includes("right")) {
        const s = Math.max(0, o);
        this.setFloatingResizeDirectionProps("right", s, s - r.right + r.width);
      }
      if (i.includes("top")) {
        const s = Math.max(0, n), c = r.top - s + r.height;
        this.setFloatingResizeDirectionProps("top", s, void 0, c);
      }
      if (i.includes("bottom")) {
        const s = Math.max(0, n), c = s - r.bottom + r.height;
        this.setFloatingResizeDirectionProps("bottom", s, void 0, c);
      }
    }, this.setFloatingResizeDirectionProps = (t, e, o, n) => {
      o && o > Number.parseFloat(window.getComputedStyle(this).getPropertyValue("--min-width")) && (this.style.setProperty(`--${t}`, `${e}px`), this.style.setProperty("width", `${o}px`));
      const i = window.getComputedStyle(this), r = Number.parseFloat(i.getPropertyValue("--header-height")), s = Number.parseFloat(i.getPropertyValue("--floating-offset-resize-threshold")) / 2;
      n && n > r + s && (this.style.setProperty(`--${t}`, `${e}px`), this.style.setProperty("height", `${n}px`), this.container.style.setProperty("margin-top", "calc(var(--floating-offset-resize-threshold) / 4)"), this.container.style.height = `calc(${n}px - var(--floating-offset-resize-threshold) / 2)`);
    }, this.floatingResizingMouseUpListener = (t) => {
      if (!this.floatingResizingStarted || !this.panelInfo?.floating)
        return;
      t.stopPropagation(), t.preventDefault(), this.floatingResizingStarted = false, Dl(() => {
        b$1.sectionPanelResizing = false;
      });
      const { width: e, height: o } = this.getBoundingClientRect(), { left: n, top: i, bottom: r, right: s } = m.anchor(this), c = window.getComputedStyle(this.container), h2 = Number.parseInt(c.borderTopWidth, 10), P = Number.parseInt(c.borderTopWidth, 10);
      tr.updatePanel(this.panelInfo.tag, {
        width: e,
        height: o - (h2 + P),
        floatingPosition: {
          ...this.panelInfo.floatingPosition,
          left: n,
          top: i,
          bottom: r,
          right: s
        }
      }), this.style.removeProperty("width"), this.style.removeProperty("height"), this.container.style.removeProperty("height"), this.container.style.removeProperty("margin-top"), this.setCssSizePositionProperties(), this.toggleAttribute("dragging", false);
    }, this.transitionEndEventListener = () => {
      this.toggling && (this.toggling = false, m.anchor(this));
    }, this.resizeInDrawerMouseDownListener = (t) => {
      t.button === 0 && (this.resizingInDrawerStarted = true, this.setAttribute("resizing", ""), $.emit("user-select", { allowSelection: false }));
    }, this.resizeInDrawerMouseMoveListener = (t) => {
      if (!this.resizingInDrawerStarted)
        return;
      const { y: e } = t;
      t.stopPropagation(), t.preventDefault();
      const o = e - this.getBoundingClientRect().top;
      this.style.setProperty("--section-height", `${o}px`), tr.updatePanel(this.panelInfo.tag, {
        height: o
      });
    }, this.resizeInDrawerMouseUpListener = () => {
      this.resizingInDrawerStarted && (this.panelInfo?.floating || (this.resizingInDrawerStarted = false, this.removeAttribute("resizing"), $.emit("user-select", { allowSelection: true }), this.style.setProperty("--section-height", `${this.getBoundingClientRect().height}px`)));
    }, this.sectionPanelMouseEnterListener = () => {
      this.hasAttribute(Pl) && (this.removeAttribute(Pl), tr.clearAttention());
    }, this.contentAreaMouseDownListener = () => {
      tr.addFocusedFloatingPanel(this.panelInfo);
    }, this.documentMouseUpEventListener = () => {
      document.removeEventListener("mousemove", this.draggingEventListener), this.panelInfo?.floating && (this.toggleAttribute("dragging", false), b$1.setSectionPanelDragging(false));
    }, this.panelHeaderMouseDownEventListener = (t) => {
      t.button === 0 && (tr.addFocusedFloatingPanel(this.panelInfo), !this.hasAttribute(g) && (t.target instanceof HTMLButtonElement && t.target.getAttribute("part") === "title-button" ? this.startDraggingDebounce(t) : this.startDragging(t)));
    }, this.startDragging = (t) => {
      m.draggingStarts(this, t), document.addEventListener("mousemove", this.draggingEventListener), b$1.setSectionPanelDragging(true), this.panelInfo?.floating ? this.toggleAttribute("dragging", true) : this.parentElement.sectionPanelDraggingStarted(this, t), t.preventDefault(), t.stopPropagation();
    }, this.startDraggingDebounce = El(this.startDragging, 200), this.draggingEventListener = (t) => {
      const e = m.dragging(this, t);
      if (this.panelInfo?.floating && this.panelInfo?.floatingPosition) {
        t.preventDefault();
        const { left: o, top: n, bottom: i, right: r } = e;
        tr.updatePanel(this.panelInfo.tag, {
          floatingPosition: {
            ...this.panelInfo.floatingPosition,
            left: o,
            top: n,
            bottom: i,
            right: r
          }
        });
      }
    }, this.setCssSizePositionProperties = () => {
      const t = tr.getPanelByTag(this.panelTag);
      if (t && (t.height !== void 0 && (this.panelInfo?.floating || t.panel === "left" || t.panel === "right" ? this.style.setProperty("--section-height", `${t.height}px`) : this.style.removeProperty("--section-height")), t.width !== void 0 && (t.floating || t.panel === "bottom" ? this.style.setProperty("--section-width", `${t.width}px`) : this.style.removeProperty("--section-width")), t.floating && t.floatingPosition && !this.toggling)) {
        const { left: e, top: o, bottom: n, right: i } = t.floatingPosition;
        this.style.setProperty("--left", e !== void 0 ? `${e}px` : "auto"), this.style.setProperty("--top", o !== void 0 ? `${o}px` : "auto"), this.style.setProperty("--bottom", n !== void 0 ? `${n}px` : ""), this.style.setProperty("--right", i !== void 0 ? `${i}px` : "");
      }
    }, this.renderPopupButton = () => {
      if (!this.panelInfo)
        return O;
      let t;
      return this.panelInfo.panel === void 0 ? t = "Close the popup" : t = this.panelInfo.floating ? `Dock ${this.panelInfo.header} to ${this.panelInfo.panel}` : `Open ${this.panelInfo.header} as a popup`, Ut`
      <vaadin-context-menu .items=${this.dockingItems} @item-selected="${this.changeDockingPanel}">
        <button
          part="popup-button"
          @click="${(e) => this.changePanelFloating(e)}"
          @mousedown="${(e) => e.stopPropagation()}"
          title="${t}"
          aria-label=${t}>
          ${this.getPopupButtonIcon()}
        </button>
      </vaadin-context-menu>
    `;
    }, this.changePanelFloating = (t) => {
      if (this.panelInfo)
        if (t.stopPropagation(), Jl(this), this.panelInfo?.floating)
          tr.updatePanel(this.panelInfo?.tag, { floating: false });
        else {
          let e;
          if (this.panelInfo.floatingPosition)
            e = this.panelInfo?.floatingPosition;
          else {
            const { left: i, top: r } = this.getBoundingClientRect();
            e = {
              left: i,
              top: r
            };
          }
          let o = this.panelInfo?.height;
          o === void 0 && this.panelInfo.expanded && (o = Number.parseInt(window.getComputedStyle(this).height, 10)), this.parentElement.forceClose(), tr.updatePanel(this.panelInfo?.tag, {
            floating: true,
            width: this.panelInfo?.width || Number.parseInt(window.getComputedStyle(this).width, 10),
            height: o,
            floatingPosition: e
          }), tr.addFocusedFloatingPanel(this.panelInfo);
        }
    }, this.toggleExpand = (t) => {
      this.panelInfo && (t.stopPropagation(), m.anchorLeftTop(this), tr.updatePanel(this.panelInfo.tag, {
        expanded: !this.panelInfo.expanded
      }), this.toggling = true, this.toggleAttribute("expanded", this.panelInfo.expanded));
    };
  }
  static get styles() {
    return [
      ie(F),
      vs`
        * {
          box-sizing: border-box;
        }

        :host {
          flex: none;
          display: grid;
          align-content: start;
          grid-template-rows: auto 1fr;
          transition: grid-template-rows var(--duration-2);
          overflow: hidden;
          position: relative;
          --min-width: 160px;
          --resize-div-size: 10px;
          --header-height: 37px;
          --content-height: calc(var(--section-height) - var(--header-height));
          --content-width: var(--content-width, 100%);
          --floating-border-width: 1px;
          --floating-offset-resize-threshold: 16px;
          cursor: var(--cursor, var(--resize-cursor, default));
        }

        :host(:not([expanded])) {
          grid-template-rows: auto 0fr;
          --content-height: 0px !important;
        }

        [part='header'] {
          align-items: center;
          color: var(--color-high-contrast);
          display: flex;
          flex: none;
          font: var(--font-small-bold);
          justify-content: space-between;
          min-width: 100%;
          user-select: none;
          -webkit-user-select: none;
          width: var(--min-width);
          height: var(--header-height);
        }

        :host([floating]:not([expanded])) [part='header'] {
          --min-width: unset;
        }

        [part='header'] {
          border-bottom: 1px solid var(--border-color);
        }

        :host([floating]) [part='header'] {
          transition: border-color var(--duration-2);
        }

        :host([floating]:not([expanded])) [part='header'] {
          border-color: transparent;
        }

        [part='title'] {
          flex: auto;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        [part='content'] {
          height: var(--content-height);
          overflow: auto;
          transition:
            height var(--duration-2),
            width var(--duration-2),
            opacity var(--duration-2),
            visibility calc(var(--duration-2) * 2);
        }

        [part='drawer-resize'] {
          resize: vertical;
          cursor: row-resize;
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 10px;
        }

        :host([floating]) [part='drawer-resize'] {
          display: none;
        }

        :host(:not([expanded])) [part='drawer-resize'] {
          display: none;
        }

        :host(:not([floating]):not(:last-child)) {
          border-bottom: 1px solid var(--border-color);
        }

        :host(:not([expanded])) [part='content'] {
          opacity: 0;
          visibility: hidden;
        }

        :host([floating]:not([expanded])) [part='content'] {
          width: 0;
          height: 0;
        }

        :host(:not([expanded])) [part='content'][style*='height'] {
          height: 0 !important;
        }

        :host(:not([expanded])) [part='content'][style*='width'] {
          width: 0 !important;
        }

        :host([floating]) {
          position: fixed;
          min-width: 0;
          min-height: 0;
          z-index: calc(var(--z-index-floating-panel) + var(--z-index-focus, 0));
          top: clamp(0px, var(--top), calc(100vh - var(--section-height) * 0.5));
          left: clamp(calc(var(--section-width) * -0.5), var(--left), calc(100vw - var(--section-width) * 0.5));
          bottom: clamp(calc(var(--section-height) * -0.5), var(--bottom), calc(100vh - var(--section-height) * 0.5));
          right: clamp(calc(var(--section-width) * -0.5), var(--right), calc(100vw - var(--section-width) * 0.5));
          width: var(--section-width);
          overflow: visible;
        }
        :host([floating]) [part='container'] {
          background: var(--surface);
          border: var(--floating-border-width) solid var(--surface-border-color);
          -webkit-backdrop-filter: var(--surface-backdrop-filter);
          backdrop-filter: var(--surface-backdrop-filter);
          border-radius: var(--radius-2);
          margin: auto;
          box-shadow: var(--surface-box-shadow-2);
          overflow: hidden;
        }
        :host([floating][expanded]) [part='container'] {
          height: calc(100% - var(--floating-offset-resize-threshold) / 2);
          width: calc(100% - var(--floating-offset-resize-threshold) / 2);
        }

        :host([floating]:not([expanded])) {
          width: unset;
        }

        :host([floating]) .drag-handle {
          cursor: var(--resize-cursor, move);
        }

        :host([floating][expanded]) [part='content'] {
          min-width: var(--min-width);
          min-height: 0;
          max-height: 85vh;
          max-width: 90vw;
          width: var(--content-width);
        }

        /* :hover for Firefox, :active for others */

        :host([floating][expanded]) [part='content']:is(:hover, :active) {
          transition: none;
        }

        [part='header'] button {
          align-items: center;
          appearance: none;
          background: transparent;
          border: 0px;
          border-radius: var(--radius-1);
          color: var(--color);
          display: flex;
          flex: 0 0 auto;
          height: 2.25rem;
          justify-content: center;
          padding: 0px;
          width: 16px;
          margin-left: 10px;
          margin-right: 10px;
        }

        div.actions {
          width: auto;
        }

        :host(:not([expanded])) div.actions {
          display: none;
        }

        [part='title'] button {
          color: var(--color-high-contrast);
          font: var(--font-xsmall-strong);
          width: auto;
        }

        [part='header'] button:hover {
          color: var(--color-high-contrast);
        }

        [part='header'] button:focus-visible {
          outline: 2px solid var(--blue-500);
          outline-offset: -2px;
        }

        [part='header'] button svg {
          display: block;
        }

        [part='header'] .actions:empty {
          display: none;
        }

        ::slotted(*) {
          box-sizing: border-box;
          display: block;
          height: var(--content-height, var(--default-content-height, 100%));
          /* padding: var(--space-150); */
          width: 100%;
        }

        :host(:not([floating])) ::slotted(*) {
          /* padding-top: var(--space-50); */
        }

        :host([dragging]) {
          opacity: 0.4;
        }

        :host([dragging]) [part='content'] {
          pointer-events: none;
        }

        :host([attention-required]) {
          --pulse-animation-duration: 2s;
          --pulse-first-color: var(--red-500);
          --pulse-second-color: var(--red-800);
          --pulse-size: 12px;
          animation: pulse 2s infinite;
        }

        :host([resizing]),
        :host([resizing]) [part='content'] {
          transition: none;
        }
        :host([resizing]) [part='content'] {
          height: 100%;
        }

        :host([hiding-while-drag-and-drop]) {
          display: none;
        }

        // dragging in drawer

        :host(:not([floating])) .drag-handle {
          cursor: grab;
        }

        :host(:not([floating])[dragging]) .drag-handle {
          cursor: grabbing;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "region"), this.reaction(
      () => tr.getAttentionRequiredPanelConfiguration(),
      () => {
        const t = tr.getAttentionRequiredPanelConfiguration();
        this.toggleAttribute(Pl, t?.tag === this.panelTag && t?.floating);
      }
    ), this.addEventListener("mouseenter", this.sectionPanelMouseEnterListener), document.addEventListener("mousemove", this.resizeInDrawerMouseMoveListener), document.addEventListener("mouseup", this.resizeInDrawerMouseUpListener), this.reaction(
      () => b$1.operationInProgress,
      () => {
        requestAnimationFrame(() => {
          this.toggleAttribute(
            "hiding-while-drag-and-drop",
            b$1.operationInProgress === Fl.DragAndDrop && this.panelInfo?.floating && !this.panelInfo.showWhileDragging
          );
        });
      }
    ), this.reaction(
      () => tr.floatingPanelsZIndexOrder,
      () => {
        this.style.setProperty("--z-index-focus", `${tr.getFloatingPanelZIndex(this.panelTag)}`);
      },
      { fireImmediately: true }
    ), this.addEventListener("transitionend", this.transitionEndEventListener), this.addEventListener("mousemove", this.floatingResizeHandlerMouseMoveListener), this.addEventListener("mousedown", this.floatingResizingMouseDownListener), this.addEventListener("mouseleave", this.floatingResizingMouseLeaveListener), document.addEventListener("mousemove", this.floatingResizingMouseMoveListener), document.addEventListener("mouseup", this.floatingResizingMouseUpListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseenter", this.sectionPanelMouseEnterListener), this.drawerResizeElement.removeEventListener("mousedown", this.resizeInDrawerMouseDownListener), document.removeEventListener("mousemove", this.resizeInDrawerMouseMoveListener), document.removeEventListener("mouseup", this.resizeInDrawerMouseUpListener), this.removeEventListener("mousemove", this.floatingResizeHandlerMouseMoveListener), this.removeEventListener("mousedown", this.floatingResizingMouseDownListener), document.removeEventListener("mousemove", this.floatingResizingMouseMoveListener), document.removeEventListener("mouseup", this.floatingResizingMouseUpListener);
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("panelTag") && (this.panelInfo = tr.getPanelByTag(this.panelTag), this.setAttribute("aria-labelledby", this.panelInfo.tag.concat("-title"))), this.toggleAttribute("floating", this.panelInfo?.floating);
  }
  updated(t) {
    super.updated(t), this.setCssSizePositionProperties();
  }
  firstUpdated(t) {
    super.firstUpdated(t), document.addEventListener("mouseup", this.documentMouseUpEventListener), this.headerDraggableArea.addEventListener("mousedown", this.panelHeaderMouseDownEventListener), this.toggleAttribute("expanded", this.panelInfo?.expanded), Zl(this), this.setCssSizePositionProperties(), this.contentArea.addEventListener("mousedown", this.contentAreaMouseDownListener), this.drawerResizeElement.addEventListener("mousedown", this.resizeInDrawerMouseDownListener), b$2(this.shadowRoot);
  }
  render() {
    return this.panelInfo ? Ut`
      <div part="container">
        <div part="header" class="drag-handle">
          ${this.panelInfo.expandable !== false ? Ut` <button
                part="toggle-button"
                @mousedown="${(t) => t.stopPropagation()}"
                @click="${(t) => this.toggleExpand(t)}"
                aria-expanded="${this.panelInfo.expanded}"
                aria-controls="content"
                aria-label="Expand ${this.panelInfo.header}">
                ${this.panelInfo.expanded ? r$1.chevronDown : r$1.chevronRight}
              </button>` : O}
          <h2 id="${this.panelInfo.tag}-title" part="title">
            <button
              part="title-button"
              @dblclick="${(t) => {
      this.toggleExpand(t), this.startDraggingDebounce.clear();
    }}">
              ${this.panelInfo.header}
            </button>
          </h2>
          <div class="actions" @mousedown="${(t) => t.stopPropagation()}">${this.renderActions()}</div>
          ${this.renderHelpButton()} ${this.renderPopupButton()}
        </div>
        <div part="content" id="content">
          <slot name="content"></slot>
        </div>
        <div part="drawer-resize"></div>
      </div>
    ` : O;
  }
  getPopupButtonIcon() {
    return this.panelInfo ? this.panelInfo.panel === void 0 ? r$1.close : this.panelInfo.floating ? this.panelInfo.panel === "bottom" ? r$1.dockBottom : this.panelInfo.panel === "left" ? r$1.dockLeft : this.panelInfo.panel === "right" ? r$1.dockRight : O : r$1.popup : O;
  }
  renderHelpButton() {
    return this.panelInfo?.helpUrl ? Ut` <button
      @click="${() => window.open(this.panelInfo.helpUrl, "_blank")}"
      @mousedown="${(t) => t.stopPropagation()}"
      title="More information about ${this.panelInfo.header}"
      aria-label="More information about ${this.panelInfo.header}">
      ${r$1.help}
    </button>` : O;
  }
  renderActions() {
    if (!this.panelInfo?.actionsTag)
      return O;
    const t = this.panelInfo.actionsTag;
    return Ls(`<${t}></${t}>`);
  }
  changeDockingPanel(t) {
    const e = t.detail.value.panel;
    if (this.panelInfo?.panel !== e) {
      const o = tr.panels.filter((n) => n.panel === e).map((n) => n.panelOrder).sort((n, i) => i - n)[0];
      Jl(this), tr.updatePanel(this.panelInfo.tag, { panel: e, panelOrder: o + 1 });
    }
    this.panelInfo.floating && this.changePanelFloating(t);
  }
};
k([
  h()
], w.prototype, "panelTag", 2);
k([
  p$1(".drag-handle")
], w.prototype, "headerDraggableArea", 2);
k([
  p$1("#content")
], w.prototype, "contentArea", 2);
k([
  p$1('[part="drawer-resize"]')
], w.prototype, "drawerResizeElement", 2);
k([
  p$1('[part="container"]')
], w.prototype, "container", 2);
k([
  g$1()
], w.prototype, "dockingItems", 2);
w = k([
  hs("copilot-section-panel-wrapper")
], w);
$.on("undoRedo", (t) => {
  const e = t.detail.files ?? K$1();
  t.detail.undo ? $.send("copilot-plugin-undo", { files: e }) : $.send("copilot-plugin-redo", { files: e });
});
var kt = (t, e, o, n) => {
  for (var i = e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (i = s(i) || i);
  return i;
};
let Y = class extends Cs {
  static get styles() {
    return [
      ie(bl),
      ie(pl),
      vs`
        :host {
          --lumo-secondary-text-color: var(--dev-tools-text-color);
          --lumo-contrast-80pct: var(--dev-tools-text-color-emphasis);
          --lumo-contrast-60pct: var(--dev-tools-text-color-secondary);
          --lumo-font-size-m: 14px;

          position: fixed;
          bottom: 2.5rem;
          right: 0rem;
          visibility: visible; /* Always show, even if copilot is off */
          user-select: none;
          z-index: 10000;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);

          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        @supports (backdrop-filter: blur(1px)) {
          .notification-tray div.message {
            backdrop-filter: blur(8px);
          }

          .notification-tray div.message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 40rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          word-break: break-all;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          max-width: 100%;
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
          display: flex;
          flex-direction: column;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }
      `
    ];
  }
  render() {
    return Ut`<div class="notification-tray">
      ${b$1.notifications.map((t) => this.renderNotification(t))}
    </div>`;
  }
  renderNotification(t) {
    return Ut`
      <div
        class="message ${t.type} ${t.animatingOut ? "animate-out" : ""} ${t.details || t.link ? "has-details" : ""}"
        data-testid="message">
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details && !t.link}">
            ${Ll(t.details)}
            ${t.link ? Ut`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>` : ""}
          </div>
          ${t.dismissId ? Ut`<div
                class="persist ${t.dontShowAgain ? "on" : "off"}"
                @click=${() => {
      this.toggleDontShowAgain(t);
    }}>
                ${It(t)}
              </div>` : ""}
        </div>
        <div
          class="dismiss-message"
          @click=${(e) => {
      m$1(t), e.stopPropagation();
    }}>
          Dismiss
        </div>
      </div>
    `;
  }
  toggleDontShowAgain(t) {
    t.dontShowAgain = !t.dontShowAgain, this.requestUpdate();
  }
};
Y = kt([
  hs("copilot-notifications-container")
], Y);
function It(t) {
  return t.dontShowAgainMessage ? t.dontShowAgainMessage : "Do not show this again";
}
N$1({
  type: zr.WARNING,
  message: "Development Mode",
  details: "This application is running in development mode.",
  dismissId: "devmode"
});
const K = El(() => {
  $.emit("component-tree-updated", {});
});
$.on("vite-after-update", () => {
  K();
});
const X = window?.Vaadin?.connectionState?.stateChangeListeners;
X ? X.add((t, e) => {
  t === "loading" && e === "connected" && b$1.active && K();
}) : console.warn("Unable to add listener for connection state changes");
$.on("copilot-plugin-state", (t) => {
  b$1.setIdePluginState(t.detail), t.detail.active && Ur("plugin-active", `${t.detail.version}-${t.detail.ide}`), t.preventDefault();
});
