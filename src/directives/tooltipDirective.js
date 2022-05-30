import category from "@/store/category";

export default {
    bind(el,{value}) {
        // document.addEventListener('DOMContentLoaded', function() {
        //     const elems = document.querySelectorAll('.tooltipped');
        //     const instances = M.Tooltip.init(elems, {html: category.tooltip});
        // });
        M.Tooltip.init(el, {html: value});
    },
    unbind(el) {
        const tooltip = M.Tooltip.getInstance(el);
        if(tooltip && tooltip.unmounted) {
             tooltip.unmounted()
        }
    }

}
