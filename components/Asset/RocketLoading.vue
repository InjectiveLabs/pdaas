<script setup lang="ts">
//
</script>

<template>
  <div class="rocket-container">
    <!-- Background glow effect -->
    <div class="rocket-glow"></div>
    
    <!-- Rocket image -->
    <div class="rocket">
      <img 
        src="/pdaas.png" 
        alt="PDaaS Rocket" 
        class="rocket-image"
      />
    </div>
    
  </div>
</template>

<style scoped>
.rocket-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rocket-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%);
  border-radius: 50%;
  animation: glow-pulse 2s ease-in-out infinite;
}

.rocket {
  position: relative;
  z-index: 2;
  animation: rocket-lift 2s ease-in-out infinite;
}

.rocket-image {
  width: 256px;
  height: 256px;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
}


/* Animations */
@keyframes rocket-lift {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-32px) rotate(3deg);
  }
  50% {
    transform: translateY(-48px) rotate(0deg);
  }
  75% {
    transform: translateY(-32px) rotate(-3deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}


@keyframes glow-pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
}
</style>
