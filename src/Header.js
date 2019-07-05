import React from 'react';
import {Link} from "react-router-dom";

const Navigation = {
    listStyle: 'none',
    padding: '0',
    display: 'flex'
};

const NavItem = {
    margin: '0 15px',
    fontSize: '18px'
};

class Header extends React.Component {

    render() {
        return <header>
            <nav>
                <ul style={Navigation}>
                    <li style={NavItem}><Link to='path-find'>Поиск пути</Link></li>
                    <li style={NavItem}><Link to='poker'>Покер</Link></li>
                    <li style={NavItem}><Link to='bank'>Банк</Link></li>
                    <li style={NavItem}><Link to='schedule'>Расписание</Link></li>
                    <li style={NavItem}><Link to='game-15'>Пятнашки</Link></li>
                </ul>
            </nav>
        </header>
    }
}

export default Header;