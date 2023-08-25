-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema QualidadeDasAguas3
-- -----------------------------------------------------
-- Este é o database de dados sobre a qualidade dos corpos d'água do RS.

-- -----------------------------------------------------
-- Schema QualidadeDasAguas3
--
-- Este é o database de dados sobre a qualidade dos corpos d'água do RS.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `QualidadeDasAguas3` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `QualidadeDasAguas3` ;

-- -----------------------------------------------------
-- Table `QualidadeDasAguas3`.`locais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `QualidadeDasAguas3`.`locais` (
  `identificacao` VARCHAR(64) NOT NULL,
  `latitude_decimal` DECIMAL(8,6) NOT NULL,
  `longitude_decimal` DECIMAL(9,6) NOT NULL,
  `utm_e` INT NULL,
  `utm_n` INT NULL,
  `altitude` INT NULL,
  `municipio` VARCHAR(64) NOT NULL,
  `bacia_hidrografica` VARCHAR(128) NOT NULL,
  `latitude` VARCHAR(16) NULL,
  `longitude` VARCHAR(16) NULL,
  PRIMARY KEY (`latitude_decimal`, `longitude_decimal`, `identificacao`, `bacia_hidrografica`, `municipio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `QualidadeDasAguas3`.`parametros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `QualidadeDasAguas3`.`parametros` (
  `parametro` VARCHAR(64) NOT NULL,
  `unidade` VARCHAR(32) NOT NULL,
  `usa_unidade` TINYINT(1) NULL,
  PRIMARY KEY (`parametro`, `unidade`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `QualidadeDasAguas3`.`valores_referencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `QualidadeDasAguas3`.`valores_referencia` (
  `parametros_parametro` VARCHAR(64) NOT NULL,
  `unidade` VARCHAR(45) NOT NULL,
  `tipo_agua` VARCHAR(32) NOT NULL,
  `use_ou_classe_agua` VARCHAR(64) NOT NULL,
  `classe_superficial` VARCHAR(64) NOT NULL,
  `valor_maximo` VARCHAR(32) NULL,
  `notas_portaria` VARCHAR(256) NULL,
  `comentarios_adicionais` VARCHAR(256) NULL,
  `condicao` VARCHAR(128) NULL,
  PRIMARY KEY (`parametros_parametro`, `tipo_agua`, `use_ou_classe_agua`, `classe_superficial`, `unidade`),
  INDEX `fk_valores_referencia_parametros1_idx` (`parametros_parametro` ASC) VISIBLE,
  CONSTRAINT `fk_valores_referencia_parametros1`
    FOREIGN KEY (`parametros_parametro`)
    REFERENCES `QualidadeDasAguas3`.`parametros` (`parametro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `QualidadeDasAguas3`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `QualidadeDasAguas3`.`usuarios` (
  `username` VARCHAR(16) NOT NULL,
  `hash` VARCHAR(128) NOT NULL,
  `salt` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `QualidadeDasAguas3`.`coletas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `QualidadeDasAguas3`.`coletas` (
  `id_coleta` INT NOT NULL AUTO_INCREMENT,
  `parametros_parametro` VARCHAR(64) NOT NULL,
  `parametros_unidade` VARCHAR(32) NULL,
  `parametro_semelhante` VARCHAR(64) NULL,
  `valor` VARCHAR(32) NULL,
  `valor_convertido` FLOAT NULL,
  `erro` VARCHAR(32) NULL,
  `responsavel_divulgacao` VARCHAR(64) NULL,
  `responsavel_coleta` VARCHAR(64) NULL,
  `data_publicacao` VARCHAR(32) NULL,
  `data_coleta` VARCHAR(32) NULL,
  `ano_convertido` INT NULL,
  `mes_convertido` TINYINT(4) NULL,
  `fonte` VARCHAR(256) NULL,
  `fonte_ativa` TINYINT(1) NULL,
  `certificado_laboratorio` TINYINT(1) NULL,
  `tipo_agua` VARCHAR(32) NULL,
  `classificacao_subterranea` VARCHAR(64) NULL,
  `ponto_referencia` VARCHAR(128) NULL,
  `locais_latitude` DECIMAL(8,6) NOT NULL,
  `locais_longitude` DECIMAL(9,6) NOT NULL,
  `locais_identificacao` VARCHAR(64) NOT NULL,
  `locais_bacia_hidrografica` VARCHAR(128) NOT NULL,
  `locais_municipio` VARCHAR(64) NOT NULL,
  `usuarios_username` VARCHAR(16) NOT NULL,
  `status` TINYINT(1) NULL,
  INDEX `fk_coletas_parametros1_idx` (`parametros_parametro` ASC, `parametros_unidade` ASC) VISIBLE,
  PRIMARY KEY (`id_coleta`, `parametros_parametro`),
  INDEX `fk_coletas_locais1_idx` (`locais_latitude` ASC, `locais_longitude` ASC, `locais_identificacao` ASC, `locais_bacia_hidrografica` ASC, `locais_municipio` ASC) VISIBLE,
  INDEX `fk_coletas_usuarios1_idx` (`usuarios_username` ASC) VISIBLE,
  CONSTRAINT `fk_coletas_parametros1`
    FOREIGN KEY (`parametros_parametro` , `parametros_unidade`)
    REFERENCES `QualidadeDasAguas3`.`parametros` (`parametro` , `unidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_coletas_locais1`
    FOREIGN KEY (`locais_latitude` , `locais_longitude` , `locais_identificacao` , `locais_bacia_hidrografica` , `locais_municipio`)
    REFERENCES `QualidadeDasAguas3`.`locais` (`latitude_decimal` , `longitude_decimal` , `identificacao` , `bacia_hidrografica` , `municipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_coletas_usuarios1`
    FOREIGN KEY (`usuarios_username`)
    REFERENCES `QualidadeDasAguas3`.`usuarios` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
