'use strict';

import React from 'react';

/**
 * @class UserAvatar
 * @extends React.Component
 *
 * @author https://github.com/bltnico
 * @url https://github.com/bltnico/react-user-avatar
 * @version 1.1.1
 *
 * @example
 *
 * <UserAvatar
 *     size={100}
 *     onClick={this.doSomething}
 *     username="bltnico"
 *     textColor="#ffffff" />
 *
 */
export default class UserAvatar extends React.Component {

    /**
     * Constructor
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            color : null,
            text : null
        }
    }

    componentDidMount() {
        this.setState({
            color : this.getColor(),
            text : this.getText()
        });
    }

    /**
     * @static getColor
     * @param {String} str
     * @return {String}
     */
    static getColor(str) {
        return this.intToRGB(this.hashCode(str));
    }

    /**
     * Thanks to Cristian Sanchez
     * @url http://stackoverflow.com/a/3426956/4185200
     *
     * @param {String} str
     * @return {String}
     */
    hashCode(str) {
        let hash = 0, i = 0;
        for(i; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
        return hash;
    }

    /**
     * Thanks to Cristian Sanchez
     * @url http://stackoverflow.com/a/3426956/4185200
     *
     * @param {Integer} int
     * @return {String}
     */
    intToRGB(i) {
        let c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }

    /**
     * Get color with username
     * @return {String}
     */
    getColor() {
        let hash = this.hashCode(this.props.username);
        return this.intToRGB(hash);
    }

    /**
     * Get text with username
     * @return {String}
     */
    getText() {
        let f, l;
        f = this.props.username.substr(0,1);
        l = this.props.username.substr(this.props.username.length - 1, this.props.username.length);
        return (f + l).toUpperCase();
    }

    /**
     * Event when user click on user avatar
     * @return {Function}
     */
    _onClick() {
        return this.props.onClick();
    }

    /**
     * Render UserAvatar component
     * @return {String}
     */
    render() {

        const styles = {
            container : {
                backgroundColor : (!this.props.borderStyle) ? "#" + this.state.color : "transparent",
                border : (!this.props.borderStyle) ? "none" : "2px solid " + this.state.color,
                borderRadius : this.props.size / 2,
                width : this.props.size,
                height : this.props.size,
                textAlign : 'center',
                lineHeight : this.props.size + "px"
            },
            text : {
                color : (!this.props.borderStyle) ? this.props.textColor : this.state.color,
                fontSize : (this.props.size / 3) + "px"
            }
        }

        return (
            <div style={styles.container} onClick={this._onClick.bind(this)}>
                <span style={styles.text}>{this.state.text}</span>
            </div>
        );
    }

}

/**
 * Define UserAvatar propTypes
 */
UserAvatar.propTypes = {
    username : React.PropTypes.string.isRequired,
    size : React.PropTypes.number,
    onClick : React.PropTypes.func,
    textColor : React.PropTypes.string,
    borderStyle : React.PropTypes.bool,
};

/**
 * Init default UserAvatar props
 */
UserAvatar.defaultProps = {
    size : 100,
    textColor : "#ffffff",
    borderStyle : false
};
