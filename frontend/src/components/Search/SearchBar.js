import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <>
            <div className='search_bar'>
                <Paper component="form" className='textField' elevation={3}>
                    <InputBase
                        className='input'
                        placeholder="Search Your favorite Restaurant..."
                        inputProps={{ 'aria-label': 'search your favorite restaurant' }}
                    />
                    <IconButton type="submit" className='iconButton' aria-label="search">
                        <SearchIcon className='search-icon' />
                    </IconButton>
                </Paper>
            </div>
        </>
    )
}

export default SearchBar
