import { useTranslation } from "react-i18next"
import '../../styles/auth.css';
import '../../styles/common.css';

export default function TypeRadioButtons({title, value="",onChange}){
 
    const {t} = useTranslation();
    return(
        <div>
            <div className='radio-tile-head font-josefin-500'>
                {title}:
            </div>
            <div className="radio-tile-group">
                <div className="input-container">
                    <input id="hairdresser" className="radio-button" type="radio" name="hairdresser" value="hairdresser" checked={value === "hairdresser"} onChange={(e) => onChange(e.target.value)}/>
                    <div className="radio-tile">
                        <div className="icon hairdresser-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                                <g>
                                    <path  d="M496.934,420.533c-5.006-11.84-13.327-21.861-23.827-28.952c-10.482-7.091-23.254-11.263-36.824-11.254   c-9.039,0-17.738,1.855-25.624,5.175c-1.894,0.808-3.736,1.731-5.538,2.69l-21.319-59.147l18.336-29.396   c0-63.665,22.726-245.915-31.024-299.648c-53.742,53.733-47.294,235.992-47.294,299.63l20.618,33.089l-23.236,55.65   c-9.373-5.122-20.161-8.05-31.531-8.042c-9.044-0.008-17.751,1.847-25.628,5.184c-11.849,4.997-21.861,13.322-28.952,23.822   c-7.105,10.491-11.263,23.262-11.25,36.824c-0.009,9.044,1.841,17.751,5.183,25.642c5.006,11.84,13.322,21.842,23.822,28.944   c10.486,7.1,23.245,11.262,36.829,11.254c9.04,0,17.743-1.829,25.624-5.184c11.835-5.005,21.86-13.339,28.947-23.83   c7.096-10.491,11.268-23.245,11.25-36.825c0.014-9.044-1.832-17.751-5.174-25.624c-1.98-4.686-4.5-9.062-7.451-13.109   l20.103-32.236l20.12,32.254c-0.47,0.631-0.945,1.26-1.398,1.891c-7.088,10.491-11.254,23.262-11.241,36.824   c-0.009,9.044,1.833,17.751,5.174,25.642c5.02,11.84,13.345,21.852,23.836,28.944c10.473,7.1,23.245,11.262,36.821,11.254   c9.035,0,17.746-1.838,25.632-5.184c11.835-5.014,21.852-13.339,28.947-23.83c7.092-10.491,11.264-23.245,11.254-36.825   C502.117,437.113,500.276,428.406,496.934,420.533z M317.922,458.086c-2.316,5.477-6.221,10.198-11.125,13.5   c-4.917,3.31-10.713,5.228-17.121,5.228c-4.287,0-8.272-0.862-11.933-2.397c-5.476-2.308-10.198-6.231-13.508-11.139   c-3.306-4.9-5.21-10.704-5.214-17.121c-0.009-4.287,0.852-8.264,2.392-11.929c2.312-5.468,6.23-10.18,11.125-13.499   c4.922-3.311,10.717-5.22,17.138-5.228c4.282,0.008,8.263,0.861,11.924,2.405c5.477,2.317,10.189,6.222,13.496,11.121   c3.311,4.926,5.218,10.722,5.223,17.13C320.324,450.435,319.471,454.429,317.922,458.086z M464.538,458.086   c-2.308,5.477-6.231,10.198-11.125,13.5c-4.913,3.31-10.717,5.21-17.126,5.228c-4.287,0-8.264-0.862-11.924-2.397   c-5.481-2.317-10.198-6.231-13.509-11.139c-3.301-4.9-5.214-10.713-5.223-17.121c0.009-4.287,0.857-8.264,2.401-11.929   c2.317-5.468,6.226-10.18,11.125-13.499c4.912-3.311,10.718-5.22,17.13-5.228c4.278,0.008,8.263,0.861,11.924,2.405   c5.476,2.317,10.202,6.222,13.504,11.121c3.302,4.918,5.219,10.722,5.232,17.13C466.939,450.435,466.087,454.429,464.538,458.086z"/>
                                    <path  d="M104.887,217.282l73.694,0.018c8.552,0,15.479-6.94,15.488-15.479c-0.009-8.538-6.941-15.479-15.474-15.479   l-73.708,0.018c-2.916-0.018-5.285-2.379-5.298-5.308l0.014-14.929c0-2.93,2.369-5.29,5.298-5.29l73.68,0.017   c8.552,0,15.479-6.941,15.466-15.479c0.013-8.574-6.914-15.462-15.466-15.462h-73.698c-2.911-0.017-5.285-2.396-5.299-5.308   l0.014-14.911c0-2.946,2.374-5.325,5.285-5.308l73.708-0.017c8.551,0,15.457-6.906,15.457-15.48   c0.013-8.52-6.914-15.46-15.466-15.46h-73.694c-2.916,0.017-5.294-2.361-5.29-5.29V53.226c0-2.929,2.374-5.29,5.294-5.29   l69.051-0.018c11.113,0,20.117-9.018,20.117-20.094c0-11.113-9.013-20.13-20.112-20.13L60.327,4.589   c-13.269-0.32-26.103,4.722-35.592,13.97C15.234,27.842,9.891,40.534,9.891,53.812L9.878,462.745   c0,13.26,5.348,25.97,14.854,35.236c9.492,9.283,22.326,14.307,35.591,14.006l113.624-3.142c11.104,0,20.112-8.982,20.1-20.095   c0-11.112-9-20.13-20.104-20.13h-69.051c-2.92,0-5.299-2.361-5.294-5.289l-0.014-14.912c0-2.928,2.37-5.307,5.303-5.307h73.694   c8.552,0,15.479-6.941,15.488-15.461c-0.009-8.539-6.932-15.479-15.488-15.479h-73.698c-2.929,0-5.299-2.38-5.29-5.29   l-0.009-14.911c0.009-2.929,2.392-5.325,5.303-5.308h73.694c8.552,0,15.479-6.941,15.466-15.461   c0.013-8.538-6.914-15.496-15.466-15.496h-73.698c-2.916,0-5.299-2.361-5.299-5.291l0.014-14.91c0-2.93,2.374-5.29,5.285-5.29   h73.708c8.542,0,15.47-6.923,15.47-15.479c-0.013-8.557-6.927-15.462-15.47-15.48h-73.703c-2.916,0-5.29-2.379-5.29-5.29v-14.929   c0-2.928,2.374-5.289,5.303-5.289h73.676c8.56-0.018,15.474-6.923,15.488-15.479c0-8.539-6.932-15.462-15.483-15.462h-73.689   c-2.907,0-5.286-2.378-5.29-5.308v-14.929C99.588,219.661,101.971,217.282,104.887,217.282z"/>
                                </g>
                            </svg>
                        </div>
                        <label htmlFor="hairdresser" className="radio-tile-label font-josefin-700">{t('hairdresser')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="beauty-salon" className="radio-button" type="radio" name="beauty-salon" value="beauty-salon" checked={value === "beauty-salon"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon beauty-salon-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 1024 1024">
                                <path d="M225.28 588.065V368.929c0-5.657 4.583-10.24 10.24-10.24h143.36c5.657 0 10.24 4.583 10.24 10.24v219.136c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V368.929c0-28.278-22.922-51.2-51.2-51.2H235.52c-28.278 0-51.2 22.922-51.2 51.2v219.136c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48zm446.628-102.78l-.005-.066.005.066zM815.463 311.1l-.003.048.003-.048zm-11.449 160.232l10.244-143.36H660.667l10.244 143.36h133.103zm39.861 16.83c-.988 13.533-12.36 24.13-25.917 24.13H656.965c-13.566 0-24.98-10.621-25.917-24.13l-12.439-174.08c-1.072-14.684 10.474-27.07 25.177-27.07h187.351c14.703 0 26.249 12.387 25.179 27.039l-12.442 174.111z"/><path d="M419.84 982.305c5.657 0 10.24-4.583 10.24-10.24v-337.92c0-5.657-4.583-10.24-10.24-10.24H204.8c-11.309 0-20.48 9.171-20.48 20.48v327.68c0 5.657 4.583 10.24 10.24 10.24h225.28zm0 40.96H194.56c-28.278 0-51.2-22.922-51.2-51.2v-327.68c0-33.931 27.509-61.44 61.44-61.44h215.04c28.278 0 51.2 22.922 51.2 51.2v337.92c0 28.278-22.922 51.2-51.2 51.2zm382.976-531.456v470.016c0 11.309-9.171 20.48-20.48 20.48h-90.112c-11.309 0-20.48-9.171-20.48-20.48V481.569c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48v480.256c0 33.931 27.509 61.44 61.44 61.44h90.112c33.931 0 61.44-27.509 61.44-61.44V491.809c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-464.896-153.6h40.96V39.201c0-32.811-29.218-49.355-57.35-32.483L271.8 36.56c-20.647 12.383-36.279 39.992-36.279 64.081v237.568h40.96V100.641c0-9.7 8.081-23.974 16.39-28.957l45.05-27.033v293.558zm288.154-296.96h222.452L815.253 315.26c-1.363 11.228 6.634 21.436 17.862 22.799s21.436-6.634 22.799-17.862l34.965-287.95v-1.239c0-16.963-13.757-30.72-30.72-30.72h-245.76c-16.963 0-30.72 13.757-30.72 30.72v1.271l35.997 289.005c1.398 11.224 11.63 19.19 22.854 17.792s19.19-11.63 17.792-22.854L626.073 41.249z"/>
                            </svg>
                        </div>
                        <label htmlFor="beauty-salon" className="radio-tile-label font-josefin-700">{t('beauty-salon')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="psychologist" className="radio-button" type="radio" name="psychologist" value="psychologist" checked={value === "psychologist"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon psychologist-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" viewBox="0 0 460.425 460.425" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <g>
                                            <path d="M240.754,266.877c7.564,2.732,60.222,21.753,66.185,23.907c4.943,1.784,10.207,0.756,14.07-2.246     c2.885-1.274,3.495-1.918,12.95-8.945c-8.418,1.88-6.434,1.436-14.696,3.281c-12.276,2.744-24.511-4.986-27.263-17.309     c-2.736-12.254,4.999-24.513,17.309-27.262l35.165-7.852l22.495-31.376l-15.892,41.361c-18.427,4.115-17.456,3.898-39.331,8.782     c-6.365,1.422-10.211,7.73-8.831,13.909c0.025,0.113,0.06,0.22,0.088,0.331c1.551,6.107,7.676,9.875,13.821,8.5l45.427-10.143     c3.808-0.85,6.937-3.549,8.337-7.192l17.548-45.674l-4.635,33.822l17.377-12.915c6.411-4.765,7.745-13.837,2.97-20.246     l-17.589-23.609c-4.868-6.534-14.184-7.758-20.575-2.696l-84.379,66.84c-19.872-7.178-12.981-4.689-35.896-12.966     c-3.455-1.248-7.253-1.163-10.647,0.241l-77.852,32.17c-7.532,3.112-11.114,11.74-8.002,19.271     c3.111,7.53,11.737,11.115,19.272,8.003L240.754,266.877z"/>
                                            <path d="M389.582,171.12c9.439,8.399,23.852,9.389,34.469,1.499c12.12-9.008,14.643-26.135,5.635-38.255     s-26.135-14.643-38.255-5.635C377.542,139.051,376.597,159.564,389.582,171.12z"/>
                                            <path d="M456.725,224.775c-5.802-7.217-16.353-8.364-23.574-2.563l-102.81,82.646H184.669c-9.261,0-16.768,7.507-16.768,16.768     c0,9.261,7.507,16.768,16.768,16.768h6.536v11.624c0,6.194,5.021,11.214,11.214,11.214c6.194,0,11.214-5.02,11.214-11.214     v-11.624h95.697v11.624c0,6.194,5.021,11.214,11.215,11.214c6.193,0,11.215-5.02,11.215-11.214v-11.624h4.485     c3.821,0,7.527-1.305,10.506-3.699l107.411-86.345C461.38,242.547,462.528,231.992,456.725,224.775z"/>
                                            <circle cx="81.216" cy="125.269" r="26.075"/>
                                            <path d="M121.219,255.01c1.425-1.224,2.583-2.8,3.31-4.674c2.361-6.082-0.655-12.927-6.737-15.289l-38.094-14.79l-8.216-37.415     l13.844,26.927l11.938,4.635l4.619-28.395c1.562-9.602-4.956-18.652-14.558-20.214l-26.939-4.382     c-12.632-3.577-22.634,3.783-24.279,13.897c-1.478,9.467-12.398,80.248-12.861,86.346c-0.333,4.345,1.335,8.379,4.221,11.208     H11.214C5.021,272.865,0,277.885,0,284.079v65.938c0,6.194,5.021,11.214,11.214,11.214c6.194,0,11.214-5.02,11.214-11.214v-18.44     h44.414v18.44c0,6.194,5.021,11.214,11.214,11.214c6.194,0,11.214-5.02,11.214-11.214c0-71.735,0.2-66.876-0.466-69.126     l13.493,1.033l-10.084,62.884c-1.24,7.731,4.022,15.002,11.752,16.243c7.752,1.239,15.005-4.04,16.243-11.752l12.524-78.089     C133.914,263.84,129.061,256.406,121.219,255.01z M66.843,316.624H22.429v-21.33h44.414V316.624z M58.795,250.16l-2.44-0.947     c-6.368-2.473-10.179-8.702-9.914-15.167l1.964-46.135l9.575,43.601c0.849,3.864,3.575,7.047,7.263,8.479l34.203,13.28     L58.795,250.16z"/>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <label htmlFor="psychologist" className="radio-tile-label font-josefin-700">{t('psychologist')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="dental-clinic" className="radio-button" type="radio" name="dental-clinic" value="dental-clinic" checked={value === "dental-clinic"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon dental-clinic-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" viewBox="0 0 403.647 403.647" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M124.149,306.024c9.399,13.524,17.334,19.823,24.969,19.823c2.879,0,9.97-1.094,13.638-11.241    c3.023-8.362,5.729-17.91,8.592-28.019c6.969-24.6,16.515-58.291,29.998-58.291h0.957c5.804,0,11.184,5.359,16.446,16.385    c5.529,11.578,9.77,27.111,13.87,42.135c2.742,10.044,5.332,19.531,8.265,27.757c3.599,10.101,10.627,11.194,13.486,11.196    c7.606,0,15.537-6.395,24.954-20.122c7.482-10.905,15.357-25.708,22.777-42.808c16.646-38.359,26.584-77.285,26.584-104.125    c0-19.684-6.971-38.33-19.631-52.505c-13.352-14.946-31.728-23.178-51.744-23.178c-15.719,0-32.351,9.175-44.498,15.876    c-3.248,1.793-9.15,5.05-10.985,5.578c-1.851-0.534-7.712-3.777-10.94-5.564c-12.121-6.706-28.719-15.89-44.549-15.89    c-20.017,0-38.393,8.232-51.743,23.178c-12.661,14.175-19.634,32.822-19.634,52.505c0,27.63,9.888,66.849,26.451,104.91    C108.791,280.576,116.653,295.237,124.149,306.024z M146.338,97.6c9.202,0,21.379,4.246,32.571,11.358    c1.614,1.026,3.964,2.833,6.237,4.581c0.918,0.705,1.822,1.4,2.667,2.036c2.756,2.064,6.479,4.762,10.846,7.33    c2.31,1.365,4.414,2.576,6.778,3.579c9.515,4.04,19.603,6.087,29.981,6.087c10.612,0,15.996-1.187,18.013-1.667    c3.782-0.902,12.638-3.308,12.465-4.616c-0.153-1.155-9.903-0.581-13.196-0.866c-3.82-0.332-15.516-1.051-29.567-4.772    c-4.219-1.118-9.933-3.373-10.19-4.619c-0.195-0.941,3.885-3.556,6.989-5.46c10.873-6.671,25.408-12.97,37.378-12.97    c35.56,0,56.81,31.074,56.81,61.116c0,24.573-9.726,62.249-25.38,98.327c-6.959,16.034-14.567,30.37-21.427,40.365    c-6.63,9.663-10.519,13.98-12.212,13.458c-0.32-0.099-0.744-0.554-0.919-1.046c-2.734-7.67-4.826-17.008-7.51-26.84    c-4.271-15.641-8.686-31.812-14.777-44.574c-7.928-16.604-17.608-24.675-29.592-24.675h-0.957    c-11.576,0-21.045,8.008-28.948,24.481c-6.066,12.643-10.638,28.781-15.079,44.455c-2.786,9.836-4.879,19.043-7.72,26.902    c-0.203,0.561-0.771,1.307-1.126,1.421c-1.676,0.536-5.612-3.569-12.361-13.278c-6.862-9.875-14.441-24.045-21.342-39.899    c-15.569-35.777-25.241-73.748-25.241-99.097C89.528,128.673,110.778,97.6,146.338,97.6z"/>
                                        <path d="M397.808,142.451c0,0-11.247,3.112-14.979,4.207c-1.688,0.495-1.813-0.472-1.813-0.472    c-8.279-36.051-26.914-68.029-54.498-93.572C292.13,20.772,247.367,3.236,200.473,3.236c-46.972,0-91.79,17.587-126.199,49.521    C40.052,84.518,19.179,127.55,15.5,173.929c-0.437,5.506,3.672,10.323,9.178,10.76c0.269,0.021,0.537,0.032,0.802,0.032    c5.164,0,9.542-3.973,9.958-9.209c6.774-85.388,79.267-152.275,165.036-152.275c77.828,0,144.605,54.257,161.324,128.329    c0,0,0.354,0.88-0.401,1.112c-5.027,1.548-20.255,5.688-20.255,5.688c-4.48,1.258-5.213,4.715-1.628,7.681l38.234,31.643    c3.586,2.966,7.76,1.794,9.275-2.605l16.172-46.92C404.712,143.764,402.288,141.194,397.808,142.451z"/>
                                        <path d="M379.694,218.959c-5.513-0.44-10.322,3.672-10.76,9.178c-6.774,85.389-79.267,152.274-165.035,152.274    c-77.855,0-144.633-54.208-161.321-128.317c0,0-0.23-1.024,0.54-1.246c5.72-1.647,19.389-5.444,19.389-5.444    c4.481-1.258,5.213-4.715,1.628-7.683L25.9,206.08c-3.585-2.967-7.758-1.795-9.275,2.604l-16.173,46.92    c-1.517,4.397,0.909,6.969,5.388,5.711c0,0,10.842-3.06,16.504-4.634c0.689-0.192,0.99,1.078,0.99,1.078    c8.269,36.082,26.917,67.713,54.521,93.274c34.388,31.841,79.15,49.377,126.043,49.377c46.972,0,91.79-17.586,126.198-49.52    c34.223-31.761,55.095-74.793,58.773-121.173C389.309,224.213,385.199,219.396,379.694,218.959z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <label htmlFor="dental-clinic" className="radio-tile-label font-josefin-700">{t('dental-clinic')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="astroturf" className="radio-button" type="radio" name="astroturf" value="astroturf" checked={value === "astroturf"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon astroturf-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" viewBox="0 0 32.074 32.074" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M16.265,12.053c-1.962,0-3.576,1.551-3.742,3.431h7.482C19.839,13.604,18.226,12.053,16.265,12.053z"/>
                                        <rect x="11.061" width="10.948" height="1.99"/>
                                        <path d="M16.265,20.672c-2.394,0-4.379-1.869-4.708-4.082H3.317v14.07c0,0.781,0.633,1.414,1.414,1.414h5.333v-2.52    c0-0.277,0.189-0.467,0.466-0.467h12.016c0.275,0,0.459,0.188,0.459,0.467v2.52h4.531c0.674,0,1.221-0.547,1.221-1.223V16.59    h-7.782C20.643,18.803,18.657,20.672,16.265,20.672z"/>
                                        <path d="M23.005,0v2.52c0,0.277-0.187,0.466-0.461,0.466H10.53c-0.277,0-0.466-0.189-0.466-0.466V0H4.748    c-0.79,0-1.43,0.64-1.43,1.43v14.054h8.201c0.168-2.433,2.231-4.432,4.746-4.432c2.514,0,4.576,1.999,4.744,4.432h7.748V1.222    C28.757,0.547,28.21,0,27.534,0H23.005z"/>
                                        <path d="M16.265,19.67c1.84,0,3.373-1.421,3.693-3.08h-7.391C12.89,18.249,14.424,19.67,16.265,19.67z"/>
                                        <rect x="11.061" y="30.084" width="10.948" height="1.99"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <label htmlFor="astroturf" className="radio-tile-label font-josefin-700">{t('astroturf')}</label>
                    </div>
                </div>
                
                <div className="input-container">
                    <input id="auto-service" className="radio-button" type="radio" name="auto-service" value="auto-service" checked={value === "auto-service"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon auto-service-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 15 15" id="car-repair">
                                <path d="M12.6,8.7,11.5,6.5a1.05,1.05,0,0,0-.9-.5H4.4a1.05,1.05,0,0,0-.9.5L2.4,8.7,1.16,9.852a.5.5,0,0,0-.16.367V14.5a.5.5,0,0,0,.5.5h2c.2,0,.5-.2.5-.4V14h7v.5c0,.2.2.5.4.5h2.1a.5.5,0,0,0,.5-.5V10.219a.5.5,0,0,0-.16-.367ZM4.5,7h6l1,2h-8ZM5,11.6c0,.2-.3.4-.5.4H2.4c-.2,0-.4-.3-.4-.5V10.4c.1-.3.3-.5.6-.4l2,.4c.2,0,.4.3.4.5Zm8-.1c0,.2-.2.5-.4.5H10.5c-.2,0-.5-.2-.5-.4v-.7c0-.2.2-.5.4-.5l2-.4c.3-.1.5.1.6.4ZM14,2V3a1.009,1.009,0,0,1-1.017,1H5.348A2.549,2.549,0,0,1,1,3.5H3.5v-2H1A2.549,2.549,0,0,1,5.348,1h7.635A1.009,1.009,0,0,1,14,2Z"/>
                            </svg>
                        </div>
                        <label htmlFor="auto-service" className="radio-tile-label font-josefin-700">{t('auto-service')}</label>
                    </div>
                </div>
                
                <div className="input-container">
                    <input id="massage-center" className="radio-button" type="radio" name="massage-center" value="massage-center" checked={value === "massage-center"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon massage-center-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256" xmlSpace="preserve">
                                <path id="XMLID_3_" d="M204.4,146.7c-3.4-10.2,2.1-21.2,12.3-24.7c10.2-3.4,21.3,2,24.7,12.2c3.4,10.2-2.1,21.3-12.3,24.7  C218.9,162.4,207.8,156.9,204.4,146.7z M14.6,176.1l181.1-1.2l0,0l7.1,5.9c0,0,3.2,3.4,9.5,3.7l24,1.2l0,0l7.8,0.1  c0.9,0,1.8-0.1,2.8-0.5c4.7-1.6,7.3-6.7,5.7-11.5c-1.2-3.6-4.4-5.9-8-6.1l-28.9-1.4l-29.7-26.6c0,0-2.8-3.1-8.8-3.3L13.8,155.7  c-0.1,0-0.4,0-0.6,0l-0.3,0c0,0,0,0,0,0c-4,0.6-8.9,4.9-8.9,10.2C4.1,171.6,8.9,176.1,14.6,176.1z M256,192h-13.6h-229H0v13h256V192  z M123,137.3v-13l-16.2-27.9c-0.5-1,0-2.6,0.8-3.3c1-0.5,2.6-0.1,3.3,0.7l18.8,32.8c1.4,2.5,4,4.5,7,4.5h32.6c4.6,0,8.3-4.2,8.3-8.7  c0-4.2-3.8-8.1-8.3-8.1l-27.1,0.2L120.7,78c-1.6-2.9-4.8-4.4-8.6-4.4c-0.4,0-1.8,0.1-2.3,0.3c-0.4,0.1-1.2,0.3-1.8,0.4  c-15.8,5.2-23.6,30.2-23.6,56.3c0,2.5,0,9,0.1,10.3L123,137.3z M131.3,73.4c10.4,0,18.8-8.5,18.8-18.8c0-10.5-8.5-18.9-18.8-18.9  c-10.5,0-18.9,8.5-18.8,18.9C112.5,65,121,73.4,131.3,73.4z M13,192H0 M13,192H0 M256,191.9L256,191.9 M256,192h-13 M256,192h-13"/>
                            </svg>
                        </div>
                        <label htmlFor="massage-center" className="radio-tile-label font-josefin-700">{t('massage-center')}</label>
                    </div>
                </div>
                
                <div className="input-container">
                    <input id="consultancy-service" className="radio-button" type="radio" name="consultancy-service" value="consultancy-service" checked={value === "consultancy-service"} onChange={(e) => onChange(e.target.value)} />
                    <div className="radio-tile">
                        <div className="icon consultancy-service-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 190" xmlSpace="preserve">
                                <path d="M48.12,27.903C48.12,13.564,59.592,2,74.023,2c14.339,0,25.903,11.564,25.903,25.903  C99.834,42.335,88.27,53.806,74.023,53.806C59.684,53.806,48.12,42.242,48.12,27.903z M191,139h-47V97c0-20.461-17.881-37-38-37H43  C20.912,60,1.99,79.14,2,98v77c-0.026,8.533,6.001,12.989,12,13c6.014,0.011,12-4.445,12-13v-75h8v88h78v-88h8l0.081,50.37  c-0.053,8.729,5.342,12.446,10.919,12.63h60C207.363,163,207.363,139,191,139z M245.044,120.005V46.524h-14.788v73.482h-4.957V62.77  h-14.788v57.236h-4.999V90.721h-14.788v29.284h-4.957v-14.913h-14.788v14.913h-8.373v-79.73H157v85.449h97v-5.606v-0.113H245.044z"/>
                            </svg>
                        </div>
                        <label htmlFor="consultancy-service" className="radio-tile-label font-josefin-700">{t('consultancy-service')}</label>
                    </div>
                </div>
                
            </div>
        </div>

    )
}