export const scroll = (callback,doc) => {

    doc.addEventListener('scroll', () => {        
            callback();
    });
};
