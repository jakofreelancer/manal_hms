import React from "react";
import css from "./style.module.css";
import "./style.css";

const Sidebar = props => (
    <aside className={css.Sidebar}>
        <ul>
            <li><a href="#" className={css.active}><span className="icon"><i className="fa fa-inbox" /></span><span className="name">Хяналтын самбар</span></a></li>
            <li><a href="#" className="item"><span className="icon"><i className="fa fa-star" /></span><span className="name">Цаг өгөлт</span></a></li>
            <li><a href="#" className="item"><span className="icon"><i className="fa fa-envelope-o" /></span><span className="name">Төлбөрийн баримт</span></a></li>
            <li><a href="#" className="item"><span className="icon"><i className="fa fa-folder-o" /></span><span className="name">Статус оруулах</span></a></li>
        </ul>
    </aside>
);

export default Sidebar;