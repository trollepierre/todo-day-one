import Todos from './modules/Todos/Todos'
import { css } from '@emotion/react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { TodoDetails } from './modules/TodoDetails/TodoDetails'

const App = () => (
  <div
    css={css`
      text-align: center;
    `}>
    <header
      css={css`
        background-color: #282c34;
        min-height: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      `}>
      <p>
        Day One Pierre Trollé Test technique
      </p>
    </header>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos/>}>
        </Route>
        <Route
          path="/todo/:id"
          element={<TodoDetails />}
        />
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
