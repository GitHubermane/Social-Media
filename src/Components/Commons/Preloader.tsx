//@ts-ignore
import preloader from '../../Assets/Loading_icon.gif'
//@ts-ignore
import PreloaderStyle from './PreloaderStyle.module.css'
export const Preloader = () => {
    return (
        <div className={PreloaderStyle.preloader__imgBlock}>
            <img
                className={PreloaderStyle.preloader__img}
                src={preloader} />
        </div>
    )
}
