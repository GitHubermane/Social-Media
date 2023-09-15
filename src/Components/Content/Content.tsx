import React, { Suspense } from "react"
//@ts-ignore
import ContentStyle from "./Content.module.css"
import { Sidebar } from "../Sidebar/Sidebar"
import { Preloader } from "../Commons/Preloader"
import { storeType } from "../../Store/ReduxStore"
import { Navigation } from "../../Navigation"

type propsType = {
  store: storeType
}
export const Content: React.FC<propsType> = (props) => {
  return (
    <div className={ContentStyle.content}>
      <Sidebar />
      <div className={ContentStyle.contentBlock}>
        <Suspense fallback={<Preloader />}>
          <Navigation />
        </Suspense>
      </div>
    </div>
  )
}
