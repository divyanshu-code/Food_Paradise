import React, { useState } from 'react'
import Head from '../../componenets/head/Head'
import Menu from '../../componenets/Menu/Menu'
import FoodDisplay from '../../componenets/fooddisplay/FoodDisplay'
import AppDownload from '../../componenets/appdownload/AppDownload'

const Home = ({ onLogin }) => {

  const [menu, setmenu] = useState("All")
  return (
    <div>
       <Head/>
       <Menu category={menu} setmenu={setmenu}/>
       <FoodDisplay category={menu} onLogin={onLogin}/>
       <AppDownload/>
    </div>
  )
}

export default Home