import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { appStateType } from "../../../Store/ReduxStore"
import { getUsers, pageChange } from "../../../Store/UsersReducer"
import { filterType } from "../../../Types/ReducersTypes"
import { Paginator } from "./Paginator/Paginator"
import { SearchForm } from "./SearchForm/SerchForm"
import { User } from "./User/User"

type propsType = {}
export const Users: React.FC<propsType> = (props) => {
  const [serachParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const UsersData = useSelector(
      (state: appStateType) => state.UsersPage.UsersData
    ),
    totalUsersCount = useSelector(
      (state: appStateType) => state.UsersPage.totalUsersCount
    ),
    currentPageNumber = useSelector(
      (state: appStateType) => state.UsersPage.currentPageNumber
    ),
    usersCount = useSelector(
      (state: appStateType) => state.UsersPage.usersCount
    ),
    followingInProgress = useSelector(
      (state: appStateType) => state.UsersPage.followingInProgress
    ),
    filter = useSelector((state: appStateType) => state.UsersPage.filter)

  const onPageChange = (pageNum: number) => {
      dispatch(pageChange(pageNum, usersCount, filter.term, filter.friends))
    },
    onFilterChange = (filter: filterType) => {
      dispatch(pageChange(1, usersCount, filter.term, filter.friends))
      dispatch(getUsers(1, usersCount, filter.term, filter.friends))
    },
    follow = (userId: number) => {
      dispatch(follow(userId))
    },
    unfollow = (userId: number) => {
      dispatch(unfollow(userId))
    }

  useEffect(() => {
    let actualPage = currentPageNumber,
      actualFilter = filter
    if (serachParams.get("page")) actualPage = Number(serachParams.get("page"))
    if (serachParams.get("term"))
      actualFilter = { ...actualFilter, term: String(serachParams.get("term")) }
    switch (serachParams.get("friends")) {
      case "null":
        actualFilter = { ...actualFilter, friends: null }
        break
      case "false":
        actualFilter = { ...actualFilter, friends: false }
        break
      case "true":
        actualFilter = { ...actualFilter, friends: true }
        break
    }
    dispatch(
      getUsers(actualPage, usersCount, actualFilter.term, actualFilter.friends)
    )
  }, [])

  useEffect(() => {
    navigate({
      pathname: "/users",
      search: `?page=${currentPageNumber}${
        filter.term ? `&term=${filter.term}` : ""
      }&friends=${filter.friends}`,
    })
  }, [filter, currentPageNumber])

  return (
    <div>
      <SearchForm onFilterChange={onFilterChange} />
      <Paginator
        totalUsersCount={totalUsersCount}
        usersCount={usersCount}
        currentPageNumber={currentPageNumber}
        onPageChange={onPageChange}
      />
      {UsersData.map((user) => (
        <User
          user={user}
          key={user.id}
          followingInProgress={followingInProgress}
          unfollow={unfollow}
          follow={follow}
        />
      ))}
    </div>
  )
}
