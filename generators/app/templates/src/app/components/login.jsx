import style from "../../styles/login.scss";
import logo from "../../img/logo.png";

import React from "react";
import cx from "classnames";
import { Constants } from "../utils";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickNavigateToList() {
        window.location.href = '#/list';
    }

    render() {
        return (
            <div className={ style.main }>
                <div className={ style.header }>
                    <img src={ logo }/>
                </div>
                <div className={ style.content }>
                    <button onClick={ this.onClickNavigateToList.bind(this) }>go next</button>
                </div>
            </div>
        );
    }
}
