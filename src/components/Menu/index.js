import React from "react";
import MenuItem from "../MenuItem";
import css from "./style.module.css";
import { connect } from "react-redux";

const Menu = props => (
    <ul className={css.Menu}>
        {localStorage.getItem("currentPermission")==="reception" ? <>
            <MenuItem active link="/dashboard" iconType="fa fa-inbox">Хяналтын самбар</MenuItem>
            <MenuItem link="/appointment" iconType="fas fa-utensils">Цаг өгөх</MenuItem>
            <MenuItem link="/bill" iconType="">Төлбөрийн баримт</MenuItem>
            <MenuItem link="/setStatus" iconType="">Статус оруулах</MenuItem>
            <br/><br/>
        </> : ""}

        {localStorage.getItem("currentPermission")==="doctor" ? <>
            <MenuItem link="/listDepartments" iconType="">Тасагуудын жагсаалт</MenuItem>
            <MenuItem link="/listEmployees" iconType="">Ажилтнуудын жагсаалт</MenuItem>
            <br/><br/>
        </> : ""}

        {localStorage.getItem("currentPermission")==="admin" ? <>
            <MenuItem link="/createDepartment" iconType="">Тасаг бүртгэх</MenuItem>
            <MenuItem link="/listDepartments" iconType="">Тасагуудын жагсаалт</MenuItem><br/>
            <MenuItem link="/signupEmployee" iconType="">Ажилтан бүртгэх</MenuItem>
            <MenuItem link="/listEmployees" iconType="">Ажилтнуудын жагсаалт</MenuItem>
            <br/><br/>
        </> : ""}

        {/* <MenuItem link="/listHospitals" iconType="">Эмнэлгүүдийн жагсаалт</MenuItem> */}
        
    </ul>
);

const mapStateToProps = state => {
    return {
        userId: state.signupLoginReducer.userId,
        permission: state.signupLoginReducer.permission
    };
} ;

export default connect(mapStateToProps)(Menu);