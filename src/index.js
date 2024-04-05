import ReactDOM from 'react-dom';
import {Suspense} from 'react';
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import App from './App';
import LoadingComp from "./components/LoadingComp";
import ThemeProvider from "./theme/ThemeProvider";
import store from "./store";
import './i18next'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

ReactDOM.render(
    <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </Suspense>
        </LocalizationProvider>
    </ThemeProvider>
    ,
    document.getElementById('root')
);
