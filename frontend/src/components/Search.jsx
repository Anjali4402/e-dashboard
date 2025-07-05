

const Search = ({handleSearch}) => {
  return (
    <div className='search-div'>
        <input 
        className='search-box'
        type="text" 
        placeholder='Search Product'
        onChange={(e)=>{handleSearch(e.target.value)}}
        />
    </div>
  )
}

export default Search