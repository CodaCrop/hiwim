---
title: Form
---

## Form

Here’s a quick example to demonstrate Bootstrap’s form styles. Keep reading for documentation on required classes, form layout, and more.

<form>
    <div class="form-group">
        <label for="exampleInputEmail1" class="form-control-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
        <span id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</span>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1" class="form-control-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
    </div>
    <div class="form-group">
        <select class="custom-select" required>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
    </div>
    <div class="form-group">
        <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Check this custom checkbox</span>
        </label>
    </div>
    <div class="form-group">
        <label class="custom-control custom-radio">
            <input id="radio1" name="radio" type="radio" checked="checked" class="custom-control-input">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Toggle this custom radio</span>
        </label>
        <label class="custom-control custom-radio">
            <input id="radio2" name="radio" type="radio" class="custom-control-input">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Or toggle this other custom radio</span>
        </label>
    </div>
    <div class="form-group">
        <label class="custom-file">
            <input type="file" id="file2" class="custom-file-input">
            <span class="custom-file-control"></span>
        </label>
    </div>
    <div class="form-group">
        <ul class="list mb-0">
            <li class="mb-2">
                <div class="form-number" data-form-number='{ "max" : 20, "min": 1 }'>
                    <button class="form-number-input-minus text-brand" data-form-number-minus>&#8211;</button>
                    <input class="form-number-input" data-form-number-input type="number" name="numberInput" min="1" max="20" step="1" value="1" inputmode="numeric" pattern="[0-9]*" readonly>
                    <button class="form-number-input-plus text-brand" data-form-number-plus>+</button>
                </div>
            </li>
        </ul>
    </div>
    <div class="form-group">
        <ul class="list-inline">
            <li class="mr-2 mb-0">
                <input class="form-selector-input" id="radio-selector-1" type="radio" name="radioSelector" value="64" checked />
                <label class="form-selector form-selector-width-small text-center" for="radio-selector-1">64 GB</label>
            </li>
            <li class="mr-2 mb-0">
                <input class="form-selector-input" id="radio-selector-2" type="radio" name="radioSelector" value="256" />
                <label class="form-selector form-selector-width-small text-center" for="radio-selector-2">256 GB</label>
            </li>    
        </ul>
    </div>
    <div class="form-group">
        <ul class="list mb-0">
            <li class="mb-2">
                <input class="form-selector-input" id="radio-selector-button-1" type="radio" name="radioSelector2" value="installment-1" />
                <label class="form-selector form-selector-indicator" for="radio-selector-button-1">
                    <span class="mr-auto">
                        &euro; 0,00 eenmalig toestelbetaling
                    </span>
                    <span class="h4 text-nowrap">&euro; 37,51/mnd</span>
                </label>
            </li>
            <li class="mb-2">
                <input class="form-selector-input" id="radio-selector-button-2" type="radio" name="radioSelector2" value="installment-2" checked />
                <label class="form-selector form-selector-indicator" for="radio-selector-button-2">
                    <span class="mr-auto">&euro; 361,79 eenmalig toestelbetaling</span>
                    <span class="h4 text-nowrap">&euro; 18,75/mnd</span>
                </label>
            </li>
            <li>
                <input class="form-selector-input" id="radio-selector-button-3" type="radio" name="radioSelector2" value="installment-3" checked />
                <label class="form-selector form-selector-indicator" for="radio-selector-button-3">
                    <span class="mr-auto">&euro; 732,05 eenmalig toestelbetaling</span>
                    <span class="h4 text-nowrap">&euro; 0,00/mnd</span>
                </label>
            </li>
        </ul>
    </div>
    <div class="form-group">
        <ul class="list-inline">
            <li>
                <input type="radio" id="ShoppingFlowTypeRenewal" checked="" value="Renewal" name="ShoppingFlowType" class="form-selector-input">
                <label for="ShoppingFlowTypeRenewal" class="form-selector form-selector-indicator form-selector-width-medium is-stacked">
                    <span class="icon-choose-document icon-extra-large mb-2"></span>
                    Ik wil verlengen
                </label>
            </li>
            <li>
                <input type="radio" id="ShoppingFlowTypeReorder" value="Reorder" name="ShoppingFlowType" class="form-selector-input">
                <label for="ShoppingFlowTypeReorder" class="form-selector form-selector-indicator form-selector-width-medium is-stacked">
                    <span class="icon-sim-card-smartphone icon-extra-large mb-2"></span>
                    Ik wil bijbestellen
                </label>
            </li>
        </ul>
    </div>
    <button type="submit" class="button-primary">Submit</button>
</form>
