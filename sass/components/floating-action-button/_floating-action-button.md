---
title: Floating action button    
---

<div class="floating-action-container">
    <button class="floating-action-button" type="button" data-modal-toggle="#exampleModalDrawer">
        <span class="icon-service-employee icon-large"></span>
        <span class="floating-action-button-text text-small text-center">Advies op maat</span>
    </button>
</div>

<!-- <div class="row" data-modal>
    <div class="column">
        <div class="modal pr-0 fade" id="exampleModalDrawer" tabindex="-1" role="dialog" aria-labelledby="exampleModalDrawerTitle" aria-hidden="true" data-modal>
            <div class="modal-dialog modal-dialog-drawer drawer-from-right">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="mb-0">Advies op maat</h4>
                        <button type="button" class="modal-close-button" data-modal-dismiss aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="column-desktop-12">
                                <p>Wil je advies op maat? Vul hieronder je telefoonnummer in en één van onze accountmanagers belt je zo spoedig mogelijk terug.</p>
                                <form novalidate="novalidate">
                                    <div class="form-group">
                                        <label for="advies-telefoon" class="form-control-label">Telefoonnummer*</label>
                                        <input type="text" id="advies-telefoon" placeholder="06-nummer" class="form-control" />
                                    </div>
                                    <button class="button-primary button-block" disabled data-modal-next-step>Bel mij terug</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-has-bg">
                        <div class="row">
                            <div class="column-desktop-12">
                                <p>Deze gegevens zullen we alleen gebruiken om je terug te bellen. Meer informatie over het gebruik en bewaren van jouw persoonsgegevens vind je in ons <a href="#">Privacy statement</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->

<div class="row" data-modal>
    <div class="column">
        <div class="modal pr-0 fade" id="exampleModalDrawer" tabindex="-1" role="dialog" aria-labelledby="exampleModalDrawerTitle" aria-hidden="true" data-modal>
            <div class="modal-dialog modal-dialog-drawer drawer-from-right">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="mb-0">Advies op maat</h4>
                        <button type="button" class="modal-close-button" data-modal-dismiss aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="column-desktop-12">
                                <div class="modal-pane">
                                    <div class="modal-pane-header text-center pt-2">
                                        <div class="rounded-circle mx-auto request-has-succeeded text-white">
                                            <span class="icon-checkmark icon-large"></span>
                                        </div>
                                        <h3 class="pt-3">Verzoek verstuurd!</h3>
                                    </div>
                                    <div class="modal-pane-body text-center">
                                        <p>Je wordt zo spoedig mogelijk teruggebeld op het volgende nummer:</p>
                                        <span class="text-weight-bolder">06123456789</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-is-borderless">
                        <a class="button-outline-primary mx-auto" data-modal-dismiss aria-label="Close">Sluiten</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- <div class="row" data-modal>
    <div class="column">
        <div class="modal pr-0 fade" id="exampleModalDrawer" tabindex="-1" role="dialog" aria-labelledby="exampleModalDrawerTitle" aria-hidden="true" data-modal>
            <div class="modal-dialog modal-dialog-drawer drawer-from-right">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="mb-0">Advies op maat</h4>
                        <button type="button" class="modal-close-button" data-modal-dismiss aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="column-desktop-12">
                                <div class="modal-pane">
                                    <div class="modal-pane-header text-center pt-2">
                                        <div class="rounded-circle mx-auto request-has-failed text-white">
                                            <span class="icon-close icon-large"></span>
                                        </div>
                                        <h3 class="pt-3">Er is iets mis gegaan!</h3>
                                    </div>
                                    <div class="modal-pane-body text-center">
                                        <p>We hebben je verzoek helaas niet kunnen verwerken.</p>
                                        <a href="" target="">Probeer het opnieuw</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-is-borderless">
                        <a class="button-outline-primary mx-auto" data-modal-dismiss aria-label="Close">Sluiten<a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->