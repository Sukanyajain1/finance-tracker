import React from 'react';
import { Link } from "react-router-dom";


const SideNav = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to={"dashboard"}>Dashboard</Link>
                </li>
                <li>
                    <Link to={"categories"}>All Categories</Link>
                </li>
                <li>
                    <Link to={"categories/new"}>Create New Categories</Link>
                </li>
                <li>
                    <Link to={"expenses"}>All Expenses</Link>
                </li>
                <li>
                    <Link to={"expenses/new"}>Create New Expense</Link>
                </li>
            </ul>

        </>
    );
}

export default SideNav;