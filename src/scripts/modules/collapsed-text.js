import { Modal } from "../classes/Modal";
import { limitStr } from "../utils/limitStr";

const collapsedItems = document.querySelectorAll("[data-collapsed-text]");

if (collapsedItems.length) {
  const reviewModal = document.querySelector(".expanded-text-modal");

  collapsedItems.forEach((item) => {
    const originalText = item.innerHTML;
    item.innerHTML = limitStr(originalText, item.dataset.collapsedText);

    const length = originalText.length;

    if (length > item.dataset.collapsedText) {
      const showBtn = document.createElement("button");
      showBtn.innerHTML = item.dataset.collapsedBtnText;
      item.append(showBtn);

      showBtn.addEventListener("click", () => {
        reviewModal.querySelector(".modal-text").innerHTML =
          item.dataset.expandedText;
        // Передаём name в модалку
        const modalName = reviewModal.querySelector(".modal-name");
        if (item.dataset.name && modalName) {
          modalName.innerHTML = item.dataset.name;
        }

        // Передаём date в модалку
        const modalDate = reviewModal.querySelector(".modal-date");
        if (item.dataset.date && modalDate) {
          modalDate.innerHTML = item.dataset.date;
        }

        // Передаём link в модалку
        const modalLink = reviewModal.querySelector(
          ".expanded-text-modal__header-footer a"
        );
        if (item.dataset.link && modalLink) {
          modalLink.href = item.dataset.link;
          modalLink.innerHTML = item.dataset.linktext;
        }

        new Modal(reviewModal).show();
      });
    }
  });
}
