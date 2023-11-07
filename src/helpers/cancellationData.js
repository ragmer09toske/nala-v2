
export function cancellationGuestData({ remainingNights,
  nights,
  priceForDays,
  accomodation,
  guestFees,
  isCleaingPrice,
  guestServiceFee,
  hostServiceFee,
  discount,
  basePrice,
  total,
  interval,
  serviceFees,
}) {

  let refundableNightPrice = 0, nonRefundableNightPrice = 0;
  let updatedHostFee = 0, payoutToHost = 0, hostRefund = 0, paidAmount = 0;
  let cancellationData = {}, updatedGuestFee = (guestServiceFee * (guestFees / 100));
  paidAmount = total + guestServiceFee;
  
  if (remainingNights >= 0) {
    if (interval <= 0 && remainingNights < nights) isCleaingPrice = 0; // Delivery fee not refund to gust after checkin
    refundableNightPrice = (remainingNights * basePrice) * (accomodation / 100);
  } else {
    refundableNightPrice = (priceForDays) * (accomodation / 100);
  }

  refundableNightPrice =  (refundableNightPrice + isCleaingPrice);
  //Payout amount to host 
  hostRefund = total - refundableNightPrice;
  // Adding Guest service if refunded amount to guest
  refundableNightPrice = (refundableNightPrice + updatedGuestFee) - discount;

  //Payout amount calculated with host service fee
  if (hostRefund > 0) {
    if (serviceFees && serviceFees.host) {
      updatedHostFee = serviceFees.host.type === 'percentage' ? hostRefund * (Number(serviceFees.host.value) / 100) : hostRefund > hostServiceFee ? hostServiceFee : hostRefund;
    }
    payoutToHost = hostRefund - updatedHostFee; // Subtracting Host service fee from  payout amount to Host
  }

  //Non refundable amount calculated based on the total amount guest paid and the refundable amount with guest service fee
  nonRefundableNightPrice = paidAmount - refundableNightPrice;
  updatedGuestFee = guestServiceFee - updatedGuestFee;
  cancellationData = {
    refundableNightPrice: refundableNightPrice.toFixed(2),
    nonRefundableNightPrice: nonRefundableNightPrice.toFixed(2),
    updatedGuestFee: updatedGuestFee.toFixed(2),
    payoutToHost: payoutToHost.toFixed(2),
    updatedHostFee: updatedHostFee.toFixed(2),
  }
  return cancellationData;
}

export function cancellationHostData({ remainingNights,
  nights,
  guestServiceFee,
  hostServiceFee,
  basePrice,
  total,
  serviceFees,
  isCleaingPrice,
  interval,
  discount }) {
  let refundAmount = 0, nonPayoutAmount = 0, refundDays = nights, payoutAmount = 0, earnedDays = nights, hostRefund = 0, cancellationData = {};
  let updatedHostFee = hostServiceFee, updatedGuestFee = guestServiceFee, totalEarnings = total - hostServiceFee;

  if (interval <= 0 && remainingNights < nights) {
    refundDays = remainingNights, earnedDays = nights - remainingNights,  guestServiceFee = 0, isCleaingPrice = 0; // Guest service fee and cleaning fee not refund to guest
  }

  //Refund amount to guest
  refundAmount = (refundDays * basePrice) + isCleaingPrice;
  //Host Payout amount without subtracting host service fee.
  hostRefund = total - refundAmount;

  //Payout amount calculated with host service fee
  if (hostRefund > 0) {
    //New host service fee calculated based on the host refund amount.
    if (serviceFees && serviceFees.host) {
      updatedHostFee = serviceFees.host.type === 'percentage' ? hostRefund * (Number(serviceFees.host.value) / 100) : hostRefund > hostServiceFee ? hostServiceFee : hostRefund;
    }
    payoutAmount = hostRefund - updatedHostFee;
    nonPayoutAmount = totalEarnings - payoutAmount; //Guest service fee and cleaning fee won't be here
  } else {
    //Payout amount of host is zero
    nonPayoutAmount = totalEarnings;
    updatedGuestFee = 0; //Guest fee refunded
    updatedHostFee = 0;
  }
  //Adding guest service fee, if it could be refunded
  refundAmount = (refundAmount + guestServiceFee) - discount;
  cancellationData = {
    refundAmount: refundAmount.toFixed(2),
    nonPayoutAmount: nonPayoutAmount.toFixed(2),
    payoutAmount: payoutAmount.toFixed(2),
    earnedDays,
    refundDays,
    updatedHostFee: updatedHostFee.toFixed(2),
    updatedGuestFee: updatedGuestFee.toFixed(2)
  }
  return cancellationData;
}
