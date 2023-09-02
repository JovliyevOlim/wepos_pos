import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/grid.css'
import './assets/css/index.css'
import {Provider} from "react-redux";
import store from "./store";
import './i18next'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import {PacmanLoader} from "react-spinners";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import '../src/font-size/TTFirsNeue-Regular.ttf'
import './index.css'
import ThemeProvider from "./theme/ThemeProvider";

ReactDOM.render(
    <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Suspense fallback={(<div className={'loader'}>
                {/*Loading ~~~*/}
                <span className={'load'}>
            <PacmanLoader
                color={'#1f6e67'}
                // loading={loading}
                // cssOverride={override}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </span>

            </div>)}>
                <Provider store={store}>
                    <ToastContainer/>
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
