import category from "@/store/category";

export default {
    tooltipDirective(el,{value}) {
        document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.tooltipped');
            const instances = M.Tooltip.init(elems, {html: category.tooltip});
        });
        M.Tooltip.init(el, {html: value});
    }
}
