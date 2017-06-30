"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _1 = require("../../");
var ContactList = (function (_super) {
    __extends(ContactList, _super);
    function ContactList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactList.prototype.onClick = function (user) {
        if (this.props.onClick) {
            this.props.onClick(user);
        }
    };
    ContactList.prototype.render = function () {
        var _this = this;
        var _a = this.props, contacts = _a.contacts, hasTopBar = _a.hasTopBar, displayNoDataText = _a.displayNoDataText, displayNoDataImage = _a.displayNoDataImage;
        return (React.createElement("div", { className: "page-container", style: hasTopBar ? { marginTop: '47px' } : {} }, (function () {
            if (contacts && contacts.length > 0) {
                var roomItems = new Array;
                for (var i = 0; i < contacts.length; i++) {
                    roomItems.push(React.createElement(_1.SimpleListItem, { key: 'contact-list-item-' + i, name: contacts[i].name, pictureUrl: contacts[i].pictureUrl, width: 40, height: 40, onClick: _this.onClick.bind(_this, contacts[i]) }));
                }
                return roomItems;
            }
            else {
                return (React.createElement("div", { className: "nodata-wrap" },
                    displayNoDataImage !== '' ? React.createElement("img", { src: displayNoDataImage }) : '',
                    React.createElement("p", { className: "nodata-text" }, displayNoDataText !== '' ? displayNoDataText : '')));
            }
        })()));
    };
    return ContactList;
}(React.Component));
ContactList.defaultProps = {
    hasTopBar: false,
};
exports.ContactList = ContactList;
//# sourceMappingURL=ContactList.js.map