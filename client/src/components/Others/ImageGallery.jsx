import {useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LightGallery from 'lightgallery/react';
import fjGallery from 'flickr-justified-gallery';

export default function ImageGallery({images,handleDelete,showDelete=false}){

    const {t} = useTranslation();


    useEffect(() => {
        fjGallery(document.querySelectorAll('.gallery'), {
        itemSelector: '.gallery__item',
        rowHeight: 180,
        lastRow: 'start',
        gutter: 2,
        rowHeightTolerance: 0.1,
        calculateItemsHeight: false,
        });
    }, []);

    useEffect(()=>{
      if(showDelete){
        document.querySelector('.lg-toolbar')
        
        const span = document.createElement("span");
        const node = document.createTextNode(t('Delete'));
        span.classList.add("deleteButton");
        span.onclick = handleDelete;
        span.appendChild(node);
        document.querySelector('.lg-toolbar').appendChild(span);
      }
    },[])

  return (
    <div>
      <LightGallery
        mode="lg-slide"
        pager={false}
        thumbnail={true}
        galleryId={'nature'}
        autoplayFirstVideo={false}
        elementClassNames={'gallery'}
        mobileSettings={{
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        }}
        loop={false}
        controls={true}

      >
        {
            images.map((image,index) =>{
                return(
                    
                    <a
                        key={index}
                        className="gallery__item"
                        data-src={image.split("/public")[1]}
                    >
                        <img
                            className="img-responsive"
                            src={image.split("/public")[1]}
                        />
                    </a>

                )
            })

        }
      </LightGallery>
    </div>
  );
};