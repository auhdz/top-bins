-- CreateTable
CREATE TABLE "StripeWebhookEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "livemode" BOOLEAN NOT NULL,
    "apiVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeWebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StripeWebhookEvent_createdAt_idx" ON "StripeWebhookEvent"("createdAt");

-- CreateTable
CREATE TABLE "RentalSubscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripeCheckoutSessionId" TEXT,
    "customerEmail" TEXT,
    "standardBins" INTEGER NOT NULL DEFAULT 0,
    "largeCrates" INTEGER NOT NULL DEFAULT 0,
    "totalBins" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,

    CONSTRAINT "RentalSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentalSubscription_stripeSubscriptionId_key" ON "RentalSubscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "RentalSubscription_stripeCheckoutSessionId_key" ON "RentalSubscription"("stripeCheckoutSessionId");

-- CreateIndex
CREATE INDEX "RentalSubscription_stripeCustomerId_idx" ON "RentalSubscription"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "RentalSubscription_customerEmail_idx" ON "RentalSubscription"("customerEmail");

-- CreateIndex
CREATE INDEX "RentalSubscription_status_idx" ON "RentalSubscription"("status");
