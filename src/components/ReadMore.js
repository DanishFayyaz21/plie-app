import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../common/Colors";
import Fonts from "../assets/Fonts";
import { normalize } from "../common/Normalize";

export default class ReadMore extends React.Component {
    state = {
        measured: false,
        shouldShowReadMore: false,
        showAllText: false
    };

    async componentDidMount() {
        this._isMounted = true;
        await nextFrameAsync();

        if (!this._isMounted) {
            return;
        }

        // Get the height of the text with no restriction on number of lines
        const fullHeight = await measureHeightAsync(this._text);
        this.setState({ measured: true });
        await nextFrameAsync();

        if (!this._isMounted) {
            return;
        }

        // Get the height of the text now that number of lines has been set
        const limitedHeight = await measureHeightAsync(this._text);

        if (fullHeight > limitedHeight) {
            this.setState({ shouldShowReadMore: true }, () => {
                this.props.onReady && this.props.onReady();
            });
        } else {
            this.props.onReady && this.props.onReady();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        let { measured, showAllText } = this.state;

        let { numberOfLines, isBack = false } = this.props;

        return (
            <View style={[styles.container]}>
                <Text
                    numberOfLines={measured && !showAllText ? numberOfLines : 0}
                    style={this.props.textStyle}
                    ref={text => { this._text = text; }}>
                    {this.props.children}
                </Text>

                {this._maybeRenderReadMore(isBack)}
            </View>
        );
    }

    _handlePressReadMore = () => {
        this.setState({ showAllText: true });
    };

    _handlePressReadLess = () => {
        this.setState({ showAllText: false });
    };

    _maybeRenderReadMore(isBack) {
        let { shouldShowReadMore, showAllText } = this.state;

        const { customStyle, customText } = this.props

        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this._handlePressReadMore);
            }
            return (
                <View style={customStyle}>
                    <Text style={[styles.button, customText]} onPress={this._handlePressReadMore}>
                        more
                </Text>
                </View>
            );
        } else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooster) {
                return this.props.renderRevealedFooter(this._handlePressReadLess);
            }

            return (
                <View style={customStyle}>
                    <Text style={[styles.button, customText]} onPress={this._handlePressReadLess}>
                        less
                </Text>
                </View>
            );
        }
    }
}

function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    container: {
        marginTop: normalize(10),
        marginBottom: normalize(15)
    },
    view: {
        width: normalize(38),
        height: normalize(18),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: normalize(2),
        marginTop: normalize(5),
        backgroundColor: Colors.primary
    },
    button1: {
        color: Colors.white,
        fontFamily: Fonts.Medium,
        fontSize: normalize(10)
    },
    button: {
        color: Colors.question2,
        fontFamily: Fonts.Regular,
        fontSize: normalize(12)
    }
});