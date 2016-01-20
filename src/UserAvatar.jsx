'use strict';

import React from 'react';

/**
 * @class UserAvatar
 * @extends React.Component
 *
 * @author https://github.com/bltnico
 * @url https://github.com/bltnico/react-user-avatar
 * @version 1.0.0
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
class UserAvatar extends React.Component {

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
            color : this.intToRGB(this.hashCode(this.props.username)),
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
    intToRGB(int) {
        let c = (int & 0x00FFFFFF).toString(16).toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
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
                backgroundColor : this.state.color,
                borderRadius : this.props.size / 2,
                width : this.props.size,
                height : this.props.size,
                textAlign : 'center',
                lineHeight : this.props.size
            },
            text : {
                color : this.props.textColor,
            }
        }

        return (
            <div style={styles.container} onClick={this._onClick}>
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
    textColor : React.PropTypes.string
};

/**
 * Init default UserAvatar props
 */
UserAvatar.defaultProps = {
    size : 100,
    textColor : "#ffffff"
};