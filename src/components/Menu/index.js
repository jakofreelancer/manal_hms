import React from "react";
import MenuItem from "../MenuItem";
import css from "./style.module.css";

const Menu = () => (
    <ul className={css.Menu}>
        <MenuItem active link="/dashboard" iconType="fa fa-inbox">Хяналтын самбар</MenuItem>
        <MenuItem link="/appointment" iconType="fas fa-utensils">Цаг өгөх</MenuItem>
        <MenuItem link="/bill" iconType="">Төлбөрийн баримт</MenuItem>
        <MenuItem link="/setStatus" iconType="">Статус оруулах</MenuItem>
        <br/>
        <br/>
        <MenuItem link="/createHospital" iconType="">Эмнэлэг бүртгэх</MenuItem>
        <MenuItem link="/createDepartment" iconType="">Тасаг бүртгэх</MenuItem>
        <MenuItem link="/signupEmployee" iconType="">Ажилтан бүртгэх</MenuItem>
        <br/>
        <MenuItem link="/listHospitals" iconType="">Эмнэлгүүдийн жагсаалт</MenuItem>
        <MenuItem link="/listDepartments" iconType="">Тасагуудын жагсаалт</MenuItem>
        <MenuItem link="/listEmployees" iconType="">Ажилтнуудын жагсаалт</MenuItem>
    </ul>
);

export default Menu;