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
var components_1 = require("../../components");
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
        var _a = this.props, contacts = _a.contacts, selectedContacts = _a.selectedContacts, hasTopBar = _a.hasTopBar, noContactListText = _a.noContactListText, noContactListImage = _a.noContactListImage;
        return (React.createElement("div", { className: "page-container", style: hasTopBar ? { marginTop: '47px' } : {} }, (function () {
            if (contacts && contacts.length > 0) {
                var roomItems = new Array;
                for (var i = 0; i < contacts.length; i++) {
                    roomItems.push(React.createElement(components_1.CheckListItem, { key: 'contact-list-item-' + i, name: contacts[i].name, pictureUrl: contacts[i].pictureUrl, width: 40, height: 40, onClick: _this.onClick.bind(_this, contacts[i]), isChecked: (selectedContacts[contacts[i].userId]) ? true : false }));
                }
                return roomItems;
            }
            else {
                return (React.createElement("div", { className: "nodata-wrap" },
                    noContactListImage !== '' ? React.createElement("img", { className: "nodata-image", src: noContactListImage }) : '',
                    React.createElement("p", { className: "nodata-text" }, noContactListText !== '' ? noContactListText : '')));
            }
        })()));
    };
    ContactList.defaultProps = {
        hasTopBar: false,
    };
    return ContactList;
}(React.Component));
exports.ContactList = ContactList;
//# sourceMappingURL=ContactList.js.map