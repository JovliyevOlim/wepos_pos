import ReactDOM from 'react-dom';
import {Suspense} from 'react';
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";

import App from './App';
import LoadingComp from "./components/LoadingComp";
import store from "./store";
import './i18next'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

ReactDOM.render(
            <Suspense fallback={<LoadingComp />}>
                <Provider store={store}>
                    <ToastContainer
                        position="top-center"
                        autoClose={1000}
                        limit={1}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </Provider>
            </Suspense>,
    document.getElementById('root')
);
