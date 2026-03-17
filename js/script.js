

// toggle password function for password input feild

function togglePassword() {

    const passwordFeild = document.getElementById('PasswordFeild');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordFeild.type === 'password') {
        passwordFeild.type = 'text'
        toggleIcon.className = 'fa-regular fa-eye position-absolute '
    }
    else {
        passwordFeild.type = 'password'
        toggleIcon.className = 'fa-regular fa-eye-slash position-absolute '
    }

}


// dashboard functions

document.addEventListener("DOMContentLoaded", () => {

    // SPA NAVIGATION — switch content sections via sidebar links
    const navLinks = document.querySelectorAll('.nav-link-custom');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Mark this link as active, remove active from all others
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // Hide all sections, then fade in the target section
            sections.forEach(section => section.classList.add('d-none'));

            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.remove('d-none');
                targetSection.style.opacity = "0";
                setTimeout(() => {
                    targetSection.style.transition = "opacity 0.3s ease-in-out";
                    targetSection.style.opacity = "1";
                }, 10);
            }

            // Auto-close sidebar when a link is tapped on mobile
            if (window.innerWidth < 768) closeSidebar();
        });
    });

    // Show the Dashboard tab by default on first load
    const defaultTab = document.querySelector('[data-target="call-settings"]');
    if (defaultTab) defaultTab.click();


    // MOBILE SIDEBAR TOGGLE
    const sidebar = document.getElementById('sidebar-wrapper');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebarToggle');

    function openSidebar() {
        sidebar.classList.add('sidebar-open');
        overlay.classList.add('active');
        toggleBtn.classList.add('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
        document.body.style.overflow = 'hidden'; // prevent background from scrolling
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar-open');
        overlay.classList.remove('active');
        if (toggleBtn) {
            toggleBtn.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
        document.body.style.overflow = '';
    }

    // Toggle sidebar open/closed on hamburger click
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
        });
    }

    // Close sidebar when the dark overlay is tapped
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar automatically when the window grows to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeSidebar();
    });

    // State to track if we are adding a new row or editing an existing one
    let modalMode = 'add';
    let currentRowBeingEdited = null; // Store a reference to the table row when in 'view/edit' view

    // AFFILIATE SECTION EDIT MODAL LOGIC
    const uploadModalEl = document.getElementById('uploadModal');
    const saveBtn = document.getElementById('modal-save-btn');
    const btnAddLink = document.getElementById('btn-add-link');
    const btnCreateLink = document.getElementById('btn-create-link');
    const btnEditDetail = document.querySelector('.btn-edit');

    if (uploadModalEl && saveBtn) {
        // Elements displaying the data
        const displayDate = document.getElementById('display-registration-date');
        const displayBrandName = document.getElementById('display-brand-name');
        const displayAffiliateLink = document.getElementById('display-affiliate-link');
        const displayVideoLink = document.getElementById('display-video-link');
        const displayDescription = document.getElementById('display-description');

        // Input elements in the modal
        const inputDate = document.getElementById('input-registration-date');
        const inputBrandName = document.getElementById('input-brand-name');
        const inputAffiliateLink = document.getElementById('input-affiliate-link');
        const inputVideoLink = document.getElementById('input-video-link');
        const inputDescription = document.getElementById('input-description');

        // Populate modal with current data when opened
        uploadModalEl.addEventListener('show.bs.modal', (e) => {
            // Determine mode from the button that triggered the modal
            if (e.relatedTarget) {
                if (e.relatedTarget.id === 'btn-add-link' || e.relatedTarget.id === 'btn-create-link') {
                    modalMode = 'add';
                } else if (e.relatedTarget.classList.contains('btn-edit')) {
                    modalMode = 'edit';
                }
            }

            if (modalMode === 'edit') {
                if (displayDate && inputDate) inputDate.value = displayDate.textContent.trim();
                if (displayBrandName) inputBrandName.value = displayBrandName.textContent.trim();
                if (displayAffiliateLink) inputAffiliateLink.value = displayAffiliateLink.textContent.trim();
                if (displayVideoLink) inputVideoLink.value = displayVideoLink.textContent.trim();
                if (displayDescription) inputDescription.value = displayDescription.textContent.trim();
            } else {
                if (inputDate) inputDate.value = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
                inputBrandName.value = '';
                inputAffiliateLink.value = '';
                inputVideoLink.value = '';
                inputDescription.value = '';
            }
        });

        // Save new data back to page elements when "Save" is clicked
        saveBtn.addEventListener('click', () => {
            const dateStr = (inputDate && inputDate.value) ? inputDate.value : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

            if (modalMode === 'edit') {
                if (displayDate) displayDate.textContent = inputDate ? inputDate.value : dateStr;
                if (displayBrandName) displayBrandName.textContent = inputBrandName.value;
                if (displayAffiliateLink) displayAffiliateLink.textContent = inputAffiliateLink.value;

                if (displayVideoLink) {
                    displayVideoLink.textContent = inputVideoLink.value;
                    // If it's an anchor tag, we also update the href
                    if (displayVideoLink.tagName === 'A') {
                        displayVideoLink.href = inputVideoLink.value;
                    }
                }
                if (displayDescription) displayDescription.textContent = inputDescription.value;

                // CRITICAL: Update the corresponding row in the Affiliate table
                if (currentRowBeingEdited && currentRowBeingEdited.cells.length >= 6) {
                    currentRowBeingEdited.cells[1].textContent = displayDate ? displayDate.textContent : dateStr;
                    currentRowBeingEdited.cells[3].textContent = inputBrandName.value;
                    currentRowBeingEdited.cells[4].textContent = inputAffiliateLink.value;
                    currentRowBeingEdited.cells[5].textContent = inputDescription.value;
                }
            } else if (modalMode === 'add') {
                // Append a new row to the table
                const tableBody = document.querySelector('.Affiliate-display-table tbody');
                if (tableBody) {
                    const rowCount = tableBody.querySelectorAll('tr').length;
                    const newId = (rowCount + 1).toString().padStart(2, '0');

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="pl-30">${newId}</td>
                        <td class="Date">${dateStr}</td>
                        <td>Customized gadget</td>
                        <td>${inputBrandName.value}</td>
                        <td>${inputAffiliateLink.value}</td>
                        <td class="Description">${inputDescription.value}</td>
                        <td class="watch-product-video pr-30">
                            <div class="d-flex align-items-center">
                                <img src="../images/icons/play-circle.png" style="cursor: pointer;">
                                <p style="margin-left: 12px; margin-top: 14px;">
                                    Watch
                                    <span class="watch-video-tag">our product video</span>
                                </p>
                                <div class="dropdown" style="margin-left: 20px;">
                                    <i class="fa-solid fa-ellipsis-vertical fs-4" style="color: #1D265D; cursor: pointer;" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul class="dropdown-menu shadow-sm border-0" style="min-width: 100px;">
                                        <li><a class="dropdown-item fw-medium view-affiliate-btn" href="#">View</a></li>
                                        <li><a class="dropdown-item fw-medium text-danger delete-affiliate-btn" href="#">Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    `;
                    tableBody.appendChild(tr);

                }
            }

            // Close the modal
            const modalInstance = bootstrap.Modal.getInstance(uploadModalEl);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }

    // IMAGE UPLOAD PREVIEW LOGIC
    function setupImageUpload(boxId, inputId) {
        const box = document.getElementById(boxId);
        const input = document.getElementById(inputId);

        if (box && input) {
            // Trigger file input when the box is clicked
            box.addEventListener('click', () => {
                input.click();
            });

            // Action Buttons Logic (Preview & Remove)
            const actionBtnsContainer = box.querySelector('.upload-action-btns');

            if (actionBtnsContainer) {
                // Prevent click on the container from triggering file selection
                actionBtnsContainer.addEventListener('click', (e) => {
                    e.stopPropagation();
                });

                // Remove button
                const removeBtn = actionBtnsContainer.querySelector('.btn-remove-image');
                if (removeBtn) {
                    removeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        input.value = ""; // Clear file input

                        // Remove preview image element
                        const previewImg = box.querySelector('.upload-preview-img');
                        if (previewImg) previewImg.remove();

                        // Hide the actions container again
                        actionBtnsContainer.classList.add('d-none');
                    });
                }

                // Preview button
                const previewBtn = actionBtnsContainer.querySelector('.btn-preview-image');
                if (previewBtn) {
                    previewBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const previewImg = box.querySelector('.upload-preview-img');
                        if (previewImg && previewImg.src) {
                            const fullPreviewModal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
                            document.getElementById('full-preview-img').src = previewImg.src;
                            fullPreviewModal.show();
                        }
                    });
                }
            }

            // Handle file selection
            input.addEventListener('change', function () {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        // Create or update preview image inside the box
                        let previewImg = box.querySelector('.upload-preview-img');

                        if (!previewImg) {
                            previewImg = document.createElement('img');
                            previewImg.className = 'upload-preview-img position-absolute top-0 start-0 w-100 h-100 object-fit-cover';
                            previewImg.style.zIndex = '1';
                            box.appendChild(previewImg);
                        }

                        previewImg.src = e.target.result;

                        // Show the actions container
                        if (actionBtnsContainer) actionBtnsContainer.classList.remove('d-none');
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
    }

    // Initialize both upload boxes
    setupImageUpload('main-upload-box', 'main-upload-input');
    setupImageUpload('modal-upload-box', 'modal-upload-input');

    // Function to open details from a given row
    function openAffiliateDetailsFromRow(row) {
        if (row && row.cells.length >= 6) {
            currentRowBeingEdited = row; // Track which row is open

            const date = row.cells[1] ? row.cells[1].textContent.trim() : '';
            const brand = row.cells[3] ? row.cells[3].textContent.trim() : '';
            const link = row.cells[4] ? row.cells[4].textContent.trim() : '';
            const desc = row.cells[5] ? row.cells[5].textContent.trim() : '';

            const displayRegDate = document.getElementById('display-registration-date');
            const displayBrandName = document.getElementById('display-brand-name');
            const displayAffiliateLink = document.getElementById('display-affiliate-link');
            const displayDescription = document.getElementById('display-description');

            if (displayRegDate) displayRegDate.textContent = date;
            if (displayBrandName) displayBrandName.textContent = brand;
            if (displayAffiliateLink) displayAffiliateLink.textContent = link;
            if (displayDescription) displayDescription.textContent = desc;

            // Switch view
            affiliateSection.classList.add('d-none');
            affiliateDetailsSection.classList.remove('d-none');

            affiliateDetailsSection.style.opacity = "0";
            setTimeout(() => {
                affiliateDetailsSection.style.transition = "opacity 0.3s ease-in-out";
                affiliateDetailsSection.style.opacity = "1";
            }, 10);
        }
    }

    // AFFILIATE TABLE ACTIONS LOGIC
    const viewAffiliateBtns = document.querySelectorAll('.view-affiliate-btn');
    const deleteAffiliateBtns = document.querySelectorAll('.delete-affiliate-btn');
    const affiliateSection = document.getElementById('affiliate');
    const affiliateDetailsSection = document.getElementById('affiliate-details');

    if (viewAffiliateBtns && affiliateSection && affiliateDetailsSection) {
        viewAffiliateBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const row = e.target.closest('tr');
                openAffiliateDetailsFromRow(row);
            });
        });
    }

    // Delegate delete logic so it handles existant and new rows
    if (affiliateSection) {
        affiliateSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-affiliate-btn')) {
                e.preventDefault();
                const row = e.target.closest('tr');
                if (row) {
                    if (confirm("Are you sure you want to delete this affiliate?")) {
                        row.remove();
                    }
                }
            }
        });
    }

    // BACK TO AFFILIATE LOGIC
    const backToAffiliateBtn = document.getElementById('back-to-affiliate');
    if (backToAffiliateBtn && affiliateSection && affiliateDetailsSection) {
        backToAffiliateBtn.addEventListener('click', () => {
            affiliateDetailsSection.classList.add('d-none');
            affiliateSection.classList.remove('d-none');

            affiliateSection.style.opacity = "0";
            setTimeout(() => {
                affiliateSection.style.transition = "opacity 0.3s ease-in-out";
                affiliateSection.style.opacity = "1";
            }, 10);
        });
    }

    // CALL SETTINGS — date selection, validation & Day off manager
    (function initCallSettings() {
        const startInput = document.getElementById('callStartDate');
        const endInput = document.getElementById('callEndDate');
        const addDayoffBtn = document.getElementById('addDayoffBtn');
        const confirmBtn = document.getElementById('confirmCallSettings');
        const dayoffList = document.getElementById('dayoff-list');
        const bookCallToggle = document.getElementById('bookCallToggle');
        const callSettingsDates = document.querySelector('.call-settings-dates');

        if (!startInput || !endInput || !addDayoffBtn || !confirmBtn || !dayoffList) return;

        // ── Book A Call Toggle Logic ─────────────────────────────────
        if (bookCallToggle && callSettingsDates) {
            function updateCallToggleState() {
                const isOn = bookCallToggle.checked;

                // Dim the entire section
                callSettingsDates.style.opacity = isOn ? '1' : '0.5';

                // Toggle clickability for start/end dates and confirm button
                startInput.disabled = !isOn;
                endInput.disabled = !isOn;
                confirmBtn.disabled = !isOn;
                
                startInput.style.cursor = isOn ? 'auto' : 'not-allowed';
                endInput.style.cursor = isOn ? 'auto' : 'not-allowed';
                confirmBtn.style.cursor = isOn ? 'pointer' : 'not-allowed';

                // For day off items: just let the existing click handler deal with it
                // We don't disable them here so the click event still fires.
                if (isOn) {
                    addDayoffBtn.style.cursor = 'pointer';
                    dayoffList.querySelectorAll('.dayoff-input, .dayoff-remove-btn').forEach(el => {
                        el.style.cursor = 'pointer';
                    });
                } else {
                    addDayoffBtn.style.cursor = 'not-allowed';
                    dayoffList.querySelectorAll('.dayoff-input, .dayoff-remove-btn').forEach(el => {
                        el.style.cursor = 'not-allowed';
                    });
                }
            }
            bookCallToggle.addEventListener('change', updateCallToggleState);
            // Defer execution so `updateDayoffState` is defined
            setTimeout(updateCallToggleState, 0); 
        }

        // Helpers

        /** Format a Date as YYYY-MM-DD (value format for <input type="date">) */
        function toInputDate(date) {
            return date.toISOString().split('T')[0];
        }

        /** Apply an error border and return false */
        function markInvalid(input, msg) {
            input.style.outline = '2px solid #CD2F3D';
            input.title = msg;
            return false;
        }

        /** Clear error state */
        function markValid(input) {
            input.style.outline = '';
            input.title = '';
        }

        /** Show an inline feedback message below the grid */
        function showFeedback(message, isError = false) {
            let fb = document.getElementById('callSettingsFeedback');
            if (!fb) {
                fb = document.createElement('p');
                fb.id = 'callSettingsFeedback';
                fb.style.cssText = 'margin-top:12px; font-size:14px; font-weight:600;';
                dayoffList.closest('.date-grid').after(fb);
            }
            fb.style.color = isError ? '#CD2F3D' : '#28a745';
            fb.textContent = message;

            // Auto-hide after 4 s
            clearTimeout(fb._timer);
            fb._timer = setTimeout(() => { fb.textContent = ''; }, 4000);
        }

        // ── Minimum date setup ────────────────────────────────────

        const TODAY = toInputDate(new Date());
        startInput.min = TODAY;

        // Helper to handle Day off inputs clickability
        function updateDayoffState() {
            // We no longer physically disable them, we handle clicks instead
            const hasDates = startInput.value && endInput.value;
            
            addDayoffBtn.style.opacity = hasDates ? '1' : '0.8';

            // Attach click interception to Add Dayoff button
            if (!addDayoffBtn.dataset.clickIntercepted) {
                addDayoffBtn.addEventListener('click', (e) => {
                    if (!bookCallToggle.checked) {
                        e.stopPropagation();
                        e.preventDefault();
                        return;
                    }
                    if (!startInput.value || !endInput.value) {
                        e.stopPropagation();
                        e.preventDefault();
                        showFeedback('Please select a Start Date and End Date first.', true);
                    }
                }, true); // Use capture phase to intercept before createDayoffEntry
                addDayoffBtn.dataset.clickIntercepted = 'true';
            }

            // Also attach click interception for the inputs
            dayoffList.querySelectorAll('.dayoff-input').forEach(input => {
                if (!input.dataset.clickIntercepted) {
                    input.addEventListener('click', (e) => {
                        if (!bookCallToggle.checked) {
                            e.preventDefault();
                            return;
                        }
                        if (!startInput.value || !endInput.value) {
                            e.preventDefault();
                            showFeedback('Please select a Start Date and End Date first.', true);
                        }
                    });
                    input.dataset.clickIntercepted = 'true';
                }
            });
        }

        // Initialize state
        updateDayoffState();

        // When start date changes: update end & Day off mins
        startInput.addEventListener('change', () => {
            markValid(startInput);
            const startVal = startInput.value;
            endInput.min = startVal || TODAY;

            // If end date is now before start, clear it
            if (endInput.value && endInput.value < startVal) {
                endInput.value = '';
            }

            // Update all Day off entries
            syncDayoffConstraints();
            updateDayoffState();
        });

        // When end date changes: update Day off maxes
        endInput.addEventListener('change', () => {
            markValid(endInput);
            // If end is before start, flag it
            if (startInput.value && endInput.value < startInput.value) {
                markInvalid(endInput, 'End date must be after start date');
                updateDayoffState();
                return;
            }
            syncDayoffConstraints();
            updateDayoffState();
        });

        // ── Day off constraint sync ───────────────────────────────

        function syncDayoffConstraints() {
            const startVal = startInput.value;
            const endVal = endInput.value;

            dayoffList.querySelectorAll('.dayoff-input').forEach(input => {
                input.min = startVal || TODAY;
                if (endVal) input.max = endVal;
                else input.removeAttribute('max');

                // Clear value if it falls outside the new range
                if (input.value) {
                    if (startVal && input.value < startVal) input.value = '';
                    if (endVal && input.value > endVal) input.value = '';
                }

                markValid(input);
            });
        }

        // ── Add Day off row ───────────────────────────────────────

        function createDayoffEntry() {
            if (!startInput.value || !endInput.value) {
                showFeedback('Please select a Start Date and End Date first.', true);
                return;
            }

            const existing = dayoffList.querySelectorAll('.dayoff-entry');

            const wrapper = document.createElement('div');
            wrapper.className = 'date-field date-field--dayoff dayoff-entry';

            const input = document.createElement('input');
            input.type = 'date';
            input.className = 'date-custom-input dayoff-input';
            input.min = startInput.value || TODAY;
            if (endInput.value) input.max = endInput.value;
            
            // inherit click interceptor flag since we just checked dates to get here
            input.dataset.clickIntercepted = 'true';

            const placeholder = document.createElement('span');
            placeholder.className = 'date-placeholder';
            placeholder.textContent = 'Day off';

            const icon = document.createElement('img');
            icon.src = 'assets/images/calendar.svg';
            icon.alt = 'Calendar';

            // Remove button (×) — separate grid item in col 4 (to the right of +)
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'dayoff-remove-btn';
            removeBtn.title = 'Remove this day off';
            removeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
            removeBtn.addEventListener('click', () => {
                removeBtn.remove(); // it's a separate DOM node
                wrapper.remove();
                // Move + back after the last dayoff entry in the grid
                repositionAddButton();
            });

            // Hide placeholder when a date is chosen
            input.addEventListener('change', () => {
                markValid(input);
                placeholder.style.opacity = input.value ? '0' : '1';
            });

            wrapper.append(input, placeholder, icon); // removeBtn is NOT inside wrapper
            dayoffList.appendChild(wrapper);
            dayoffList.appendChild(removeBtn); // separate direct grid child (col 4)

            repositionAddButton();
        }

        /** Keep + always right before the last × button in the grid */
        function repositionAddButton() {
            const removeBtns = [...dayoffList.querySelectorAll('.dayoff-remove-btn')];

            if (removeBtns.length === 0) {
                // No dynamic entries — restore + to its original position after dayoffList
                dayoffList.after(addDayoffBtn);
                return;
            }

            // Non-last × buttons: place them in col 3 (no + beside them)
            removeBtns.forEach((btn, i) => {
                btn.style.gridColumn = i < removeBtns.length - 1 ? '3' : '';
            });

            // Insert + right before the last × → they end up side-by-side: [+(col3)][×(col4)]
            const lastRemoveBtn = removeBtns[removeBtns.length - 1];
            lastRemoveBtn.before(addDayoffBtn);
        }

        addDayoffBtn.addEventListener('click', createDayoffEntry);

        // Also listen for changes on the first (static) dayoff input
        const firstDayoffInput = dayoffList.querySelector('.dayoff-input');
        if (firstDayoffInput) {
            firstDayoffInput.addEventListener('change', () => {
                markValid(firstDayoffInput);
                const ph = firstDayoffInput.nextElementSibling;
                if (ph && ph.classList.contains('date-placeholder')) {
                    ph.style.opacity = firstDayoffInput.value ? '0' : '1';
                }
            });
        }

        // ── Confirm validation ────────────────────────────────────

        confirmBtn.addEventListener('click', () => {
            let valid = true;

            // Start date required & must be ≥ today
            if (!startInput.value) {
                markInvalid(startInput, 'Please select a start date');
                valid = false;
            } else if (startInput.value < TODAY) {
                markInvalid(startInput, 'Start date cannot be in the past');
                valid = false;
            } else {
                markValid(startInput);
            }

            // End date required & must be ≥ start date
            if (!endInput.value) {
                markInvalid(endInput, 'Please select an end date');
                valid = false;
            } else if (startInput.value && endInput.value < startInput.value) {
                markInvalid(endInput, 'End date must be after start date');
                valid = false;
            } else {
                markValid(endInput);
            }

            // All Day off inputs must fall inside start–end range (optional but if set must be valid)
            dayoffList.querySelectorAll('.dayoff-input').forEach(input => {
                if (!input.value) return; // Day off is optional
                if (startInput.value && input.value < startInput.value) {
                    markInvalid(input, 'Day off must be within the selected range');
                    valid = false;
                } else if (endInput.value && input.value > endInput.value) {
                    markInvalid(input, 'Day off must be within the selected range');
                    valid = false;
                } else {
                    markValid(input);
                }
            });

            if (!valid) {
                showFeedback('Please fix the highlighted fields.', true);
                return;
            }

            // ── All valid — collect data ──────────────────────────
            const daysOff = [...dayoffList.querySelectorAll('.dayoff-input')]
                .map(i => i.value)
                .filter(Boolean);

            console.log('Call Settings saved:', {
                startDate: startInput.value,
                endDate: endInput.value,
                daysOff,
            });

            showFeedback('Your call has been booked!');
        });

    })();

});
