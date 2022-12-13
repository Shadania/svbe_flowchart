
import HeaderLink from './HeaderLink.js'

function Header() {
    return (
        <header>
            <h1 className="text-3xl font-bold underline text-white text-center">
                Sustainable Value-Based Entrepreneurship
            </h1>
            <nav className="mx-4 flex justify-center">
                <div class='flex flex-row'>
                    <HeaderLink url='/' text='Home' />
                </div>
            </nav>
        </header>
    )
}

export default Header;