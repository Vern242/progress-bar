import {Checkout as SourceCheckout} from 'SourceRoute/Checkout/Checkout.component';
import {ContentWrapper} from 'SourceComponent/ContentWrapper/ContentWrapper.component';

/** @namespace ProgressBar/Route/Checkout/Component */
export class CheckoutComponent extends SourceCheckout {
    getSteps() {
        const steps = [];
        for (const step in this.stepMap) {
            const title = this.stepMap[step].title;
            const adjustedTitle = title.replace(/step/g, '');
            steps.push(adjustedTitle);
        }

        return steps;
    }

    orderCompletionStatus() {
        const {stepMap} = this;
        const {checkoutStep} = this.props;

        const stepTitle = stepMap[checkoutStep].title;
        const adjustedTitle = stepTitle.replace(/step/g, '');

        const allSteps = this.getSteps();

        const completedIndex = allSteps.indexOf(adjustedTitle);

        return completedIndex;
    }

    isActive(currentLocation, index) {
        if (currentLocation >= index) return true;
        else return false;
    }

    isFinished(currentLocation, index) {
        if (currentLocation > index) return true;
        else return false;
    }

    render() {
        const steps = this.getSteps();
        const currentStepIndex = this.orderCompletionStatus();
        return (
            <main block="Checkout">
                <div block="Checkout-ProgressBar" elem="Container">
                    {steps.map((stepTitle, idx) => {
                        const isActive = this.isActive(currentStepIndex, idx);
                        const isFinished = this.isFinished(currentStepIndex, idx);
                        const active = isActive ? 'active' : '';

                        if (idx === steps.length - 1) return <div className={`Checkout-ProgressBar-Bar ${active}`} />;
                        return (
                            <>
                                <div className={`Checkout-ProgressBar-Bar ${active}`} />
                                <div className="Checkout-ProgressBar-Step">
                                    <div className={`Checkout-ProgressBar-Step-Circle ${active}`}>
                                        {isFinished === true && <div className="Checkout-ProgressBar-Step-Tick"></div>}
                                        {isFinished !== true && <div className={`Checkout-ProgressBar-Step-Circle-Text ${active}`}>{idx + 1}</div>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
                <div className="Checkout-ProgressBar-Titles-Container">
                    {steps.map((stepTitle, idx) => {
                        const isActive = this.isActive(currentStepIndex, idx);
                        const active = isActive ? 'active' : '';
                        if (idx === steps.length - 1) return <div className="Checkout-ProgressBar-Titles-Spacer" />;
                        return (
                            <>
                                <div className="Checkout-ProgressBar-Titles-Spacer" />
                                <div className={`Checkout-ProgressBar-Titles-Text ${active}`}>{stepTitle}</div>
                            </>
                        );
                    })}
                </div>

                <ContentWrapper wrapperMix={{block: 'Checkout', elem: 'Wrapper'}} label={__('Checkout page')}>
                    {this.renderSummary(true)}
                    <div block="Checkout" elem="Step">
                        {this.renderTitle()}
                        {this.renderGuestForm()}
                        {this.renderStep()}
                        {this.renderLoader()}
                    </div>
                    <div>
                        {this.renderSummary()}
                        {this.renderPromo()}
                        {this.renderCoupon()}
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default CheckoutComponent;
